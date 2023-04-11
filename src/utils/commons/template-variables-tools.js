const lang_values = require('./lang').values;
const messenger = require('./messenger');

/**
 * Tools allowing to add todos in templates
 * and show todos.
 */
class TemplatesLangClass {
    constructor(local_prefix) {
        this.local_prefix = `${local_prefix}.`;
    }

    /**
     * Return options.
     *
     * @returns {{}}
     */
    get options() {
        if (!this._options) {
            this._options = this.filter(this.local_prefix, lang_values);
        }

        return this._options;
    }

    /**
     * Return data filtered by prefix.
     *
     * @param prefix
     * @returns {{}}
     */
    get(prefix) {
        return this.filter(prefix, this.options);
    }

    /**
     * Return data filtered by prefix.
     *
     * @param prefix
     * @returns {{}}
     */
    filter(prefix, data) {
        const values = {};
        Object.keys(data)
            .filter(key => key.indexOf(prefix) === 0)
            .forEach(key => {
                values[key.replace(prefix, '')] = data[key];
            })
        return values;
    }

    /**
     * Alert todos.
     *
     * @param prefix
     */
    alertTodos(prefix = 'todo') {
        const todos = Object.values(this.get(prefix));

        if(todos.length){
            messenger.info("Attention ! Il reste des éléments actions à effectuer de votre côté")
            todos.forEach(item => messenger.message(item));
        }
    }
}

module.exports = (local_prefix) => {
    return new TemplatesLangClass(local_prefix);
}