const glob = require("glob");
const path = require("path");
const conf = require("./configuration")


/**
 * Load all entity files.
 *
 * @param type
 * @param dirs
 * @param options
 * @returns {*[]}
 */
const load = function (type, dirs, options) {
    const entities = [];

    dirs = Array.isArray(dirs) ? dirs : conf.getPluginDirs(type);

    // Define installer directories.
    dirs.forEach((dir) => {
        glob.sync(path.join(dir, `*/*.${type}.js`))
            .forEach(entity => entities.push(new (require(entity))(options)));
    })

    return entities;
}
module.exports = {
    load: load,
};