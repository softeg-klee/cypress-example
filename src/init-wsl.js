const glob = require('glob');
const path = require('path');
const os = require('os');
const fs = require('fs');
const tfs = require('./utils/commons/fs-template');
const messenger = require('./utils/commons/messenger');

const rc_adds = `
# set DISPLAY variable to the IP automatically assigned to WSL2
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
export LIBGL_ALWAYS_INDIRECT=1
sudo /etc/init.d/dbus start &> /dev/null
`

messenger.title("Initialisation du WSL Display");

// Foreach ~.*rc file that contains export.
let source_cmd = [];
const rc_files = glob.sync(path.join(os.homedir(), '.*rc'))
    .filter(file => {
        const content = fs.readFileSync(file, 'utf8');
        return content.indexOf('export ') > -1 && content.indexOf('export DISPLAY') < 0;
    });

rc_files.forEach(file => {
    tfs.append(file, rc_adds);
    tfs.commit();
    source_cmd.push(`source ~/${path.basename(file)}`);
})

messenger.info("Pour finaliser la configuration, veuillez lancer la commande suivante : ")
if (rc_files.length) {
    messenger.info(`${source_cmd.join(' && ')} && echo "DISPLAY ID : ${DISPLAY}"`)
}
else {
    messenger.info(`echo "DISPLAY ID : \$\{DISPLAY\}"`)
}

