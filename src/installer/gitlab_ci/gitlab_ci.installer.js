const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const prompts = require('prompts');

const lang = require('../../utils/commons/lang')('gitlab_ci')
const tfs = require('../../utils/commons/fs-template');
const variables = require('../../utils/commons/variables');
const template_tools = require('../../utils/commons/template-variables-tools')('gitlab_ci');
const messenger = require('../../utils/commons/messenger')

const InstallerAbstract = require('../../utils/installers/installer.abstract');

class GitlabCiInstaller extends InstallerAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                id: 'gitlab_ci',
                groups: ['ci'],
                title: lang('title'),
                description: lang('description'),
            }
        };
    }

    /**
     * Check if project is elligible.
     *
     * @private
     */
    _isEligible() {
        return true;
    }

    /**
     * Generate.
     *
     * @private
     */
    async _doInstall() {
        const values = await this._getValues();
        await this._installSerialize(values);
    }

    /**
     * Return template values.
     * @returns {Promise<{}>}
     * @private
     */
    async _getValues() {
        const default_values = this.getDefaultValues()

        const questions = [];

        questions.push(
            {
                type: 'select',
                name: 'type',
                message: lang('type.question'),
                choices: [
                    {
                        title: lang('type.serialize'),
                        description: lang('type.serialize.description'),
                        value: 'serialize'
                    },
                    // {
                    //     title: lang('type.parallelize'),
                    //     description: lang('type.parallelize.description'),
                    //     value: 'parallelize'
                    // },
                ],
                initial: 0
            }
        );

        // General questions.
        let values = await prompts(questions);
        // Stages.
        values = {...values, ...await this._askForStages(default_values, values)}

        return values;
    }

    /**
     * Return default values according to existing .gitlab-ci.yml
     */
    getDefaultValues() {
        const default_values = {};

        // Check gitlab-ci file.
        if (fs.existsSync(this.getGitlabFilePath())) {
            const content = yaml.parse(fs.readFileSync(this.getGitlabFilePath(), 'utf8'));
            default_values.stages = content?.stages || [];
        }

        return default_values;
    }

    /**
     * Return the gitlab file path.
     */
    getGitlabFilePath() {
        return path.resolve(this.options.project_path, '.gitlab-ci.yml')
    }

    /**
     * Select stage.
     *
     * @param default_values
     * @param values
     * @returns {Promise<*>}
     * @private
     */
    async _askForStages(default_values, values) {
        const other = lang('stage.other');
        if (default_values.stages?.length) {
            default_values.stages.push(other);
            values = await prompts([
                {
                    type: 'select',
                    name: 'stage',
                    message: lang('stage.question'),
                    choices: default_values.stages.map(value => {
                        return {value: value, title: value}
                    }),
                }
            ])
        }

        if (!values.stage || values.stage === other) {
            values = await prompts([
                {
                    type: 'text',
                    name: 'stage',
                    message: lang('stage.question'),
                    initial: 'e2e',
                    required: true,
                }
            ])
            values.create_stage = true;
        }

        return values;
    }

    /**
     * Install serialize gitlab element.
     *
     * @param values
     * @private
     */
    async _installSerialize(values) {
        const file_path = this.getGitlabFilePath();
        values.create_file = !fs.existsSync(file_path);

        // Update or create .gitlab-ci.yml.
        tfs.conditionalAppendOrCreateTpl(
            path.join(__dirname, 'template', values.type, '.gitlab-ci.yml'),
            file_path,
            {
                ...variables,
                ...values,
                ...template_tools.options
            }
        );
        await tfs.commit();

        template_tools.alertTodos('todo');
    }

}

module.exports = GitlabCiInstaller;