class GeneratorAbstract {

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

    /**
     * Generate.
     */
    generate() {
        if (typeof this._doGenerate === 'function') {
            const info = this.info();
            console.log("=================");
            console.log(`Generate : ${info.title}  (${info.id})`);
            console.log(info.description);

            this._doGenerate();
        }
    }
}

module.exports = GeneratorAbstract