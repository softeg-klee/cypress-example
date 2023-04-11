const fs = require('fs');
const path = require('path');

const tfs = require('../../utils/commons/fs-template')
const lang = require('../../utils/commons/lang')('docksal_command');
const messenger = require('../../utils/commons/messenger');
const variables = require('../../utils/commons/variables');
const InstallerAbstract = require('../../utils/installers/installer.abstract');

class DocksalCommandInstaller extends InstallerAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                id: 'docksal_command',
                groups: ['dev'],
                title: lang('title'),
                description: lang('description'),
            }
        };
    }

    /**
     * Check if project is elligible.
     *
     * Project is eligible if .docksal rep exists
     * and .docksal/cypress/run does not exist yet
     *
     *
     * @private
     */
    _isEligible() {
        return fs.existsSync(this.getDocksalRepPath())
            && !fs.existsSync(this.getDocksalCommandPath())
    }

    /**
     * Generate.
     *
     * @private
     */
    async _doInstall() {
        tfs.copyTpl(
            path.join(__dirname, 'template'),
            path.join(this.getDocksalCommandPath(), '..'),
            {
                ...this.options,
                ...variables,
            });
        await tfs.commit();

        messenger.info(lang('end'));
    }

    /**
     * Return the .docksal rep path.
     */
    getDocksalRepPath() {
        return path.join(this.options.project_path, '.docksal')
    }

    /**
     * Return the .docksal/cypress/run file path.
     *
     * @returns {string}
     */
    getDocksalCommandPath() {
        return path.join(this.getDocksalRepPath(), 'commands', 'cypress', 'run')
    }

}

module.exports = DocksalCommandInstaller;