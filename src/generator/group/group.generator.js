const prompts = require('prompts');
const path = require('path');
const string_case = require('change-case');
const tfs = require('../../utils/commons/fs-template');
const env = require('../../utils/commons/env');

const GeneratorAbstract = require('../../utils/generators/generator.abstract');

class InstallerGroupGenerator extends GeneratorAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                title: "Groupe d'installateur",
                description: "Génère un groupe d'installateur",
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

        // TPL.
        tfs.copyTpl(
            path.join(input_dir, 'template.group.js'),
            path.join(output_dir, `${values.id}.group.js`),
            values);

        tfs.commit();
    }

    /**
     * Get template values.
     */
    async getValues() {
        const values = await prompts([
            {
                type: 'text',
                name: 'name',
                message: 'Nom du groupe',
                required: true,
            },
            {
                type: 'text',
                name: 'id',
                message: 'Identifiant du groupe',
                required: true,
            },
            {
                type: 'text',
                name: 'description',
                message: 'Description du groupe',
                required: true,
            },
            {
                type: 'text',
                name: 'weight',
                message: 'Poids (position) ?',
                required: true,
                initial: 10,
            },
        ])

        // Clean values.
        values.id = string_case.snakeCase(values.id);
        values.class_name = string_case.pascalCase(`${values.id}Group`);

        return values;
    }

    /**
     * Output dir.
     *
     * @param values
     * @returns {string}
     */
    getOutputDir(values) {
        return path.join(process.cwd(), 'src', 'group', values.id);
    }

}

module.exports = InstallerGroupGenerator;