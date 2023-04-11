const messenger = require('../commons/messenger');

class InstallerAbstract {

    constructor(options) {
        this.options = options;
    }

    /**
     * Info
     *
     * @returns {*}
     */
    info() {
        return {
            id: this.constructor.name,
            title: this.constructor.name,
            description: this.constructor.name,
        }
    }

    async install() {
        if (typeof this._doInstall === 'function') {
            const info = this.info();
            messenger.title(`Install : ${info.title}  (${info.id})`);
            messenger.message(info.description);

            await this._doInstall();
        }
    }

    /**
     * Check if installer is elligible.
     *
     * @returns {false|boolean|*}
     */
    isEligible() {
        return (
            typeof this._doInstall === 'function'
            && (typeof this._isEligible !== 'function' || this._isEligible())
        )
    }
}

module.exports = InstallerAbstract