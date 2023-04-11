const fs = require('fs');
const path = require('path');

const lang = require('<%= path %>/utils/commons/lang')('<%= id %>');
const messenger = require('<%= path %>/utils/commons/messenger');
const InstallerAbstract = require('<%= path %>/utils/installers/installer.abstract');

class <%= class_name %> extends InstallerAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                id: '<%= id %>',
                groups: ['<%- groups.join("','") %>'],
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

module.exports = <%= class_name %>;