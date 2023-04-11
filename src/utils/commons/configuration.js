const fs = require('fs');
const path = require('path');

/**
 * Configuration helper.
 */
class ConfigurationClass {

    constructor() {
        this.config_file_path = this._getConfigFilePathInTree();
        if (fs.existsSync(this.config_file_path)) {
            this.conf = require(this.config_file_path);
        }
    }

    /**
     * Return config file path in tree
     *
     * @returns {string|string}
     * @private
     */
    _getConfigFilePathInTree() {
        let config_file_path, dir = process.cwd();
        do {
            config_file_path = path.join(dir, 'installer.config.json')
            dir = dir.split('/')
            dir.pop()
            dir = dir.join('/');
        }
        while (!fs.existsSync(config_file_path) && dir.length);

        return fs.existsSync(config_file_path) ? config_file_path : path.join(process.cwd(), 'installer.config.json');
    }

    /**
     * Init conf file.
     */
    async setup() {
        if (this.conf){
            return;
        }

        this.conf = {};
        const values = await require('prompts')([{
            type: 'text',
            name: 'project_path',
            initial: '../',
            message: 'Répertoire principal du projet git (relatif)',
        }])
        this.set('project_path', values.project_path);
        this.addPlugin('cypress-example');
    }

    /**
     * Get conf.
     *
     * @param key
     * @returns {*|{}}
     */
    get(key) {
        if (key) {
            return this.conf[key]
        }
        return this.conf;
    }

    /**
     * Update conf.
     *
     * @param key
     * @param value
     * @returns {ConfigurationClass}
     */
    set(key, value) {
        this.conf[key] = value;
        this._save();
        return this;
    }

    /**
     * Save conf state in file.
     *
     * @private
     */
    _save() {
        fs.writeFileSync(
            this.config_file_path,
            JSON.stringify(this.conf)
        )
    }

    /**
     * Add a plugin in conf.
     *
     * @param plugin
     * @returns {ConfigurationClass}
     */
    addPlugin(plugin) {
        const plugins = this.getPlugins()
        if (plugins.indexOf(plugin) < 0) {
            plugins.push(plugin);
        }

        this.set('plugins', plugins);
        return this;
    }

    /**
     * Retourne la liste des plugins dispos
     * @returns {*|{}|*[]}
     */
    getPlugins() {
        return this.get('plugins') || [];
    }

    /**
     * Plugin dirs.
     */
    getPluginDirs(type) {
        const dirs = []

        // Plugins.
        this.getPlugins().forEach(
            plugin => {
                const dir_path = path.resolve('node_modules', plugin, 'src', type)
                if (fs.existsSync(dir_path)) {
                    dirs.push(dir_path);
                }
            }
        )

        // Root.
        const root = path.join(process.cwd(), 'src', type);
        if (fs.existsSync(root)) {
            dirs.push(root);
        }
        return dirs;
    }

}

module.exports = new ConfigurationClass();
