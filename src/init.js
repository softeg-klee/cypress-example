const conf = require('./utils/commons/configuration');

conf.setup().then(() => {
    const yargs = require('yargs/yargs');
    const {hideBin} = require('yargs/helpers');
    const args = yargs(hideBin(process.argv)).argv;
    const installProcessor = require('./utils/installers/install-processor');

    // Define options.
    const options = {
        ...conf.get(),
        ...{
            test_eligibility: !args.force,
            verbose: args.v === true
        }
    }

    ////////////////////////
    ///// List all available installers.
    if (args.l || args.list) {
        // Direct install
        installProcessor.listInstallers();
        return;
    }

    ////////////////////////
    ///// Launch direct installer
    if (args['_'].length) {
        // Direct install
        installProcessor.directInstall(args['_'], options);
        return;
    }

    ////////////////////////
    ///// Launch available all installer wizard
    installProcessor.promptInstall(options)
})
