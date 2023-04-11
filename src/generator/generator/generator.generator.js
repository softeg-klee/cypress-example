const prompts = require('prompts');
const path = require('path');
const string_case = require('change-case');
const tfs = require('../../utils/commons/fs-template');
const env = require('../../utils/commons/env');

const GeneratorAbstract = require('../../utils/generators/generator.abstract');

class GeneratorGenerator extends GeneratorAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                title: 'Générateur',
                description: 'Génère un générateur',
            }
        };
    }

    /**
     * Generate.
     *
     * @private
     */
    async _doGenerate() {
        // Clean values.
        const values = await this.getValues();
        values.path = env.src;

        const input_dir = path.join(__dirname, 'template');
        const output_dir = this.getOutputDir(values);

        // TPL
        tfs.copyTpl(
            path.join(input_dir, 'template.generator.js'),
            path.join(output_dir, `${values.id}.generator.js`),
            values);

        tfs.copy(
            path.join(input_dir),
            path.join(output_dir, 'template'),
            values);

        tfs.commit();
    }

    /**
     * Get template values.
     *
     * @returns {Promise<*>}
     */
    async getValues() {
        const values = await prompts([
            {
                type: 'text',
                name: 'name',
                message: 'Quel est le nom du générateur ?',
                required: true,
            },
            {
                type: 'text',
                name: 'id',
                message: 'Quelle est la classe du générateur ?',
                required: true,
            },
            {
                type: 'text',
                name: 'description',
                message: 'Quelle est la description du générateur ?',
                required: true,
            }
        ])

        // Clean values.
        values.id = string_case.snakeCase(values.id);
        values.class_name = string_case.pascalCase(`${values.id}Generator`);

        return values;
    }

    /**
     * Output dir.
     *
     * @param values
     * @returns {string}
     */
    getOutputDir(values) {
        return path.join(process.cwd(), 'src', 'generator', values.id);
    }
}

module.exports = GeneratorGenerator;