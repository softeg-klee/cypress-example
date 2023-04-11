const path = require('path');
const conf = require('./configuration');

/**
 * Return the current cypress version in package.json
 */
function getCypressVersion() {
    return require('cypress/package.json').version;
}

/**
 * Return the test repertory name.
 */
function getTestDir() {
    return path.relative(conf.get('project_path'), process.cwd());
}


/**
 * Common variables.
 *
 * @type {{cypress_version: *, dir: string}}
 */
module.exports = {
    cypress_version: getCypressVersion(),
    dir: getTestDir(),
}
