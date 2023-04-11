const prompts = require('prompts');
const path = require('path');
const string_case = require('change-case');
const glob = require('glob');
const fs = require('fs')

const tfs = require('../../utils/commons/fs-template')
const GeneratorAbstract = require('../../utils/generators/generator.abstract');

class HelperGenerator extends GeneratorAbstract {

    /**
     * Info.
     *
     * @returns {{description: string, title: string}}
     */
    info() {
        return {
            ...super.info(),
            ...{
                title: "Helper",
                description: "Générer un nouveau helper",
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
            path.join(input_dir, 'template.js'),
            path.join(output_dir, `${values.id}.js`),
            values);

        // Readme.md
        tfs.copyTpl(
            path.join(input_dir, 'readme.md'),
            path.join(output_dir, 'readme.md'),
            values);

        await tfs.commit();

        this.refreshReadme();
        this.refreshHelperAggregator();
    }

    /**
     * Get template values.
     */
    async getValues() {
        const values = await prompts([
            {
                type: 'text',
                name: 'id',
                message: 'name',
                required: true,
            },
        ])

        // Clean values.
        values.id = string_case.snakeCase(values.id);

        return values;
    }

    /**
     * Output dir.
     *
     * @param values
     * @returns {string}
     */
    getOutputDir(values) {
        return path.join(__dirname, '..', '..', '..', 'helpers', (values ? values?.id : ''));
    }

    /**
     * Return the list of all helpers.
     */
    getAllHelpers() {
        if (!this.all_helpers) {
            this.all_helpers = glob.sync(path.join(process.cwd(), 'helpers', '*/readme.md'))
                .map(p => {
                    return path.basename(path.dirname(p));
                })

            this.all_helpers.sort();
        }

        return this.all_helpers;
    }

    /**
     * Refresh readme.
     */
    refreshReadme() {
        let content = `# Helpers.\r\n\r\n\r\n`

        content += this.getAllHelpers()
            .map(item => {
                return `- [${item}](./${item}/readme.md)`
            })
            .join(`\r\n`);

        fs.writeFileSync(this.getOutputDir({id: 'readme.md'}), content)
    }

    /**
     * Refresh helpers.js
     */
    refreshHelperAggregator() {
        const helpers = this.getAllHelpers();

        // Imports
        const imports = helpers
            .map(item => {
                return `import * as _${item} from './helpers/${item}/${item}';`
            })
            .join(`\r\n`);

        // Imports
        const exports = helpers
            .map(item => {
                return `export const ${item} = _${item};`
            })
            .join(`\r\n`);

        // Imports
        let agg = `/**
 * Aggregator.
 */
export const Helpers = {\r\n`;
        agg += helpers
            .map(item => {
                return `    ${item}: _${item},`
            })
            .join(`\r\n`);
        agg += `\r\n}`

        fs.writeFileSync(this.getOutputDir({id: '../helpers.js'}), [imports, exports, agg].join(`\r\n\r\n`))
    }
}

module.exports = HelperGenerator;