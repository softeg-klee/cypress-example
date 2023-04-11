const prompts = require('prompts');
const path = require('path');
const string_case = require('change-case');
const tfs = require('../../utils/commons/fs-template')
const env = require('../../utils/commons/env');

const GeneratorAbstract = require('../../utils/generators/generator.abstract');
const {load} = require("../../utils/commons/entity-repository");

class InstallerGenerator extends GeneratorAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                title: "Installateur",
                description: "Génère un installateur",
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
        values.path = env.src

        const input_dir = path.join(__dirname, 'template');
        const output_dir = this.getOutputDir(values);

        // TPL.
        tfs.copyTpl(
            path.join(input_dir, 'template.installer.js'),
            path.join(output_dir, `${values.id}.installer.js`),
            values);
        tfs.copyTpl(
            path.join(input_dir, 'template.lang.json'),
            path.join(output_dir, `${values.id}.lang.json`),
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
                message: 'Nom de l\'installateur',
                required: true,
            },
            {
                type: 'text',
                name: 'id',
                message: 'Identifiant de l\'ìnstallateur',
                required: true,
                initial: (options) => {
                    return string_case.snakeCase(options);
                }
            },
            {
                type: 'text',
                name: 'description',
                message: 'Description de l\'ìnstallateur',
                required: true,
            },
            {
                type: 'multiselect',
                name: 'groups',
                message: 'Groupe de l\'ìnstallateur',
                required: true,
                initial: 'default',
                choices: load('group').map( group => {
                    const info = group.info();
                    return {
                        value: info.id,
                        name: info.title,
                    }
                })
            },
        ])

        // Clean values.
        values.id = string_case.snakeCase(values.id);
        values.class_name = string_case.pascalCase(`${values.id}Installer`);
        values.groups = values.groups || [];

        return values;
    }

    /**
     * Output dir.
     *
     * @param values
     * @returns {string}
     */
    getOutputDir(values) {
        return path.join(process.cwd(), 'src', 'installer', values.id);
    }

}

module.exports = InstallerGenerator;