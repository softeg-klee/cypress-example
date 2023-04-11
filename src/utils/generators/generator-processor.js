const path = require('path');
const glob = require('glob');
const prompts = require('prompts');
const repo = require('../commons/entity-repository');

class GeneratorProcessorClass {

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
            generators: {
                dirs: [path.join(process.cwd(), 'src', 'generators')],
            }
        }
    }


    /**
     * Run all installer processors.
     */
    async run() {
        const generators = this._getAllGenerators()

        // Ask witch installer to install.
        const values = await prompts([{
            type: 'multiselect',
            name: 'generators',
            message: 'Quels éléments voulez-vous générer ?',
            instructions: false,
            choices: generators.map(generator => {
                const info = generator.info();
                return {
                    value: info.id,
                    title: `${info.title} : ${info.description}`,
                }
            })
        }])

        // Run selected installers.
        generators
            .filter(generator => {
                return values.generators?.indexOf(generator.info().id) > -1;
            })
            .forEach(generator => {
                try {
                    generator.generate();
                } catch (e) {
                    console.error(`Cannot install : ${generator.info().id}`);
                }
            })
    }

    /**
     * Returne the list of available installers.
     *
     * @private
     */
    _getAllGenerators() {
        return repo.load('generator', null, this.options);
    }
}

module.exports = function (options) {
    const generateProcessor = new GeneratorProcessorClass(options);
    generateProcessor.run();
}