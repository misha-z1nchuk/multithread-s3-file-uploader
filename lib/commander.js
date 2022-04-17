const { program } = require('commander');

program
    .option('--threads <int>')
    .option('-f, --folder <string>');

program.parse();

const options = program.opts();
const threads = options.threads || undefined;
const pathFolder = options.folder || undefined;

module.exports = {
    program,
    threads: parseInt(threads, 10),
    pathFolder,
};
