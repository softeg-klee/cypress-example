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

    install() {
        if (typeof this._doInstall === 'function') {
            const info = this.info();
            console.log("=================");
            console.log(`Install : ${info.title}  (${info.id})`);
            console.log(info.description);

            this._doInstall();
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