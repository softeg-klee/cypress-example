const fs = require('fs');
const path = require('path');

const lang = require('../../utils/commons/lang')('jenkins_ci');
const messenger = require('../../utils/commons/messenger');
const InstallerAbstract = require('../../utils/installers/installer.abstract');

class JenkinsCiInstaller extends InstallerAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                id: 'jenkins_ci',
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
        // @todo
        return true;
    }

    /**
     * Generate.
     *
     * @private
     */
    async _doInstall() {
        // @todo.
    }

}

module.exports = JenkinsCiInstaller;