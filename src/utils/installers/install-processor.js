const path = require('path');
const prompts = require('prompts');
const repo = require('../commons/entity-repository');
const lang = require('../commons/lang')('installers');
const messenger = require('../commons/messenger');

class InstallProcessorClass {

    /**
     * Constructor.
     *
     * @param options
     */
    constructor(options) {
        this.options = {
            ...this.getDefaultOptions(),
            ...options,
        };
    }

    /**
     * Default options.
     */
    getDefaultOptions() {
        return {
            project_path: process.cwd(),
            test_path: process.cwd(),
            test_eligibility: true,
            installers: {
                dirs: [path.join(process.cwd(), 'src', 'installers')],
            },
            verbose: false,
        }
    }

    /**
     * Run all installer processors.
     */
    async run() {
        let installers = this.getAllInstallers();
        await this.runMandatoryEliglibleInstallers(installers);

        // Filter installers after elligibility done.
        installers = this._getFilterEligibleInstallers(installers);
        const groups = this._getAllAvailableGroups(installers);

        if (groups.length) {
            this._askGroupsQuestions(groups, installers);
        } else {
            this._askInstallersQuestions(installers);
        }
    }

    /**
     * Execute all installers or groups.
     * @param selected_installers
     * @returns {Promise<void>}
     */
    async runInstallers(ids) {
        const installers = this.getAllInstallers();

        const filtered_groups = this._getAllAvailableGroups(installers)
            .filter(group => ids.indexOf(group.info().id) > -1)

        if (filtered_groups.length) {
            for (let i in filtered_groups) {
                await this._askInstallersQuestions(filtered_groups[i].installers);
            }
        }

        installers.filter(installer => ids.indexOf(installer.info().id) > -1)
            .forEach(installer => this._installInstaller(installer));
    }

    /**
     * Return the list of available installers.
     */
    getAllInstallers() {
        return repo.load('installer', null, this.options);
    }

    /**
     * Return filtered list of eligible installers.s
     * @private
     */
    _getFilterEligibleInstallers(installers) {
        if (!this.options.test_eligibility) {
            return installers;
        }

        return installers.filter(installer => {
            return !installer.info()?.mandatory && typeof installer.isEligible === 'function' && installer.isEligible();
        })
    }

    /**
     * Return the list of all groups.
     *
     * @returns {*}
     * @private
     */
    _getAllAvailableGroups(installers) {
        const groups = {};

        repo.load('group', null, null)
            .sort((a, b) => {
                return a.info().weight - b.info().weight;
            })
            .forEach(group => {
                const info = group.info();
                group.installers = []
                groups[info.id] = group;
            })

        const default_group = groups.default ?? {installers: []};

        // Dispatch installers in their groups.
        installers.forEach(installer => {
            installer.info().groups
                .forEach(installer_group => {
                    (groups[installer_group] ?? default_group).installers.push(installer)
                })
        })

        return Object.values(groups).filter(group => group.installers.length);
    }

    /**
     * Installer selections.
     *
     * @param installers
     * @private
     */
    async _askInstallersQuestions(installers) {
        // Ask witch installer to install.
        const values = await prompts([{
            type: 'multiselect',
            name: 'installers',
            message: lang('installer_selection_question'),
            instructions: false,
            choices: installers.map(installer => {
                const info = installer.info();
                return {
                    value: info.id,
                    title: `${info.title} : ${info.description}`,
                    selected: false,
                }
            })
        }])

        // Run selected installers.
        installers
            .filter(installer => {
                return values.installers?.indexOf(installer.info().id) > -1;
            })
            .forEach(installer => this._installInstaller(installer))
    }

    /**
     * Launch installer process.
     *
     * @param installer
     * @private
     */
    async _installInstaller(installer) {
        try {
            await installer.install();
        } catch (e) {
            messenger.error(`Cannot install : ${installer.info().id} (use -v option for more info) `);
            messenger.warn(`yarn set-up ${installer.info().id} -v`);
            if (this.options.verbose) {
                console.log(e);
                process.exit();
            }
        }
    }

    /**
     * Group selections
     *
     * @param groups
     * @private
     */
    async _askGroupsQuestions(groups) {
        const values = await prompts([{
            type: 'multiselect',
            name: 'groups',
            message: lang('group_selection_question'),
            instructions: false,
            choices: groups.map(group => {
                const info = group.info();
                return {
                    value: info.id,
                    title: [info.title, info.description].filter(v => v.length).join(' : '),
                    selected: false,
                }
            })
        }])

        // Installers.
        const filtered_groups = groups
            .filter(group => values.groups?.indexOf(group.info().id) > -1);
        for (let i in filtered_groups) {
            messenger.title(filtered_groups[i].info().title);
            await this._askInstallersQuestions(filtered_groups[i].installers);
        }
    }

    /**
     * Run mandatory eligible tasks.
     *
     * @param installers
     */
    async runMandatoryEliglibleInstallers(installers) {
        const mandatory = installers
            .filter(installer => installer.info().mandatory && installer.isEligible())
        for (let i in mandatory) {
            await this._installInstaller(mandatory[i]);
        }
    }
}

/**
 * Prompt install process.
 *
 * @param options
 */
module.exports.promptInstall = function (options) {
    const installProcessor = new InstallProcessorClass(options);
    installProcessor.run();
}

/**
 * Direct install process.
 *
 * @param options
 */
module.exports.directInstall = function (ids, options) {
    const installProcessor = new InstallProcessorClass(options);
    installProcessor.runInstallers(ids)
}

/**
 * List installers.
 *
 * @param options
 */
module.exports.listInstallers = function (options) {
    const installProcessor = new InstallProcessorClass(options);
    installProcessor.getAllInstallers()
        .forEach(installer => {
            let info = installer.info();
            info = `[${info.id}] ${[info.title, info.description].filter(n => n.length).join(' : ')}`
            if (installer.isEligible()) {
                messenger.message(info);
            } else {
                messenger.warn(`${info} (ineligible)`);
            }
        })

}
