const fs = require('fs')
const readdir = require('recursive-readdir');
const async = require('async');
const path = require('path');
const { Worker } = require('worker_threads')
const Piscina = require('piscina');

const rootFolder = path.resolve(__dirname, '../');
const uploadFolder = '../folder_to_upload';

const piscina = new Piscina({
    filename: path.resolve(__dirname, 'thread.js'),
    maxThreads: 4
});

const os = require('os')
const cpuCount = os.cpus().length

console.log(cpuCount)
function getFiles(dirPath) {
    return fs.existsSync(dirPath) ? readdir(dirPath) : [];
}

let taskQueue = [];


console.time("dbsave");

async function deploy(upload) {
    // if (!BUCKET || !KEY || !SECRET) {
    //     throw new Error('you must provide env. variables: [BUCKET, KEY, SECRET]');
    // }

    const filesToUpload = await getFiles(path.resolve(__dirname, upload));

    return new Promise((resolve, reject) => {
        async.eachOfLimit(filesToUpload, 10, async.asyncify(async (file) => {
            const Key = file.replace(`${rootFolder}/`, '');
            console.log(`uploading: [${Key}]`);
            return new Promise(async (res, rej) => {
                let result = await piscina.run({
                    file: file,
                    Key: Key,
                })
                res('worker' + result)
            });
        }), (err) => {
            if (err) {
                return reject(new Error(err));
            }
            resolve({ result: true });
        });
    });
}

deploy(uploadFolder)
    .then(() => {
        console.timeEnd("dbsave");
        console.log('task complete');
        console.log(taskQueue)
        process.exit(0);
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });

console.log(1)