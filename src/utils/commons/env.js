let is_core;
try {
    require('cypress-example/src/utils/commons.lang.json');
    is_core = false;
} catch (e) {
    is_core = true;
}

module.exports.is_core = is_core;
module.exports.src = is_core ? '../..' : 'cypress-example/src';