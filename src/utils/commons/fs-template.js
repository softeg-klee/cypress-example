const fs = require('fs')
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');

const store = memFs.create();
const tfs = editor.create(store)

/**
 * Add conditionalAppendTpl method.
 */
tfs.conditionalAppendTpl = (from, to, context) => {
    const content = fs.readFileSync(from);
    return tfs.appendTpl(to, content, context);
}

/**
 * Add conditionalAppendOrCreateTpl method.
 */
tfs.conditionalAppendOrCreateTpl = (from, to, context) => {
    if (fs.existsSync(to)) {
        return tfs.conditionalAppendTpl(from, to, context);
    } else {
        return tfs.copyTpl(from, to, context);
    }
}


module.exports = tfs;