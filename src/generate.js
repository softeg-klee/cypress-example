const conf = require('./utils/commons/configuration');

conf.setup().then(() => {
    const processGenerate = require('./utils/generators/generator-processor');
    processGenerate();
})
