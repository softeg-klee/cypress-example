const prompts = require('prompts');
const path = require('path');
const string_case = require('change-case');
const tfs = require('<%= path %>/utils/commons/fs-template')

const GeneratorAbstract = require('<%= path %>/utils/generators/generator.abstract');

class <%= class_name %> extends GeneratorAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                title: "<%= name %>",
                description: "<%= description %>",
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

        const input_dir = path.join(__dirname, 'template');
        const output_dir = this.getOutputDir(values);

        // TPL.
        tfs.copyTpl(
            path.join(input_dir, 'template.generator.js'),
            path.join(output_dir, `${values.id}.generator.js`),
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
                message: 'name',
                required: true,
            },
            {
                type: 'text',
                name: 'id',
                message: 'id',
                required: true,
            },
        ])

        // Clean values.
        values.id = string_case.snakeCase(values.id);
        values.class_name = string_case.pascalCase(values.id);

        return values;
    }

    /**
     * Output dir.
     *
     * @param values
     * @returns {string}
     */
    getOutputDir(values) {
        return path.join(__dirname, '..', '..', '<%= id %>', values.id);
    }

}

module.exports = <%= class_name %>;