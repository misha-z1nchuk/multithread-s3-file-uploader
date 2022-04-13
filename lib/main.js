const fs = require('fs')
const readdir = require('recursive-readdir');
const async = require('async');
const path = require('path');
const { Worker } = require('worker_threads')

const rootFolder = path.resolve(__dirname, '../');
const uploadFolder = '../folder_to_upload';



const os = require('os')
const cpuCount = os.cpus().length

console.log(cpuCount)
function getFiles(dirPath) {
    return fs.existsSync(dirPath) ? readdir(dirPath) : [];
}

let taskQueue = [];


async function deploy(upload) {
    // if (!BUCKET || !KEY || !SECRET) {
    //     throw new Error('you must provide env. variables: [BUCKET, KEY, SECRET]');
    // }

    const filesToUpload = await getFiles(path.resolve(__dirname, upload));

    return new Promise((resolve, reject) => {
        async.eachOfLimit(filesToUpload, 10, async.asyncify(async (file) => {
            const Key = file.replace(`${rootFolder}/`, '');
            console.log(`uploading: [${Key}]`);
            return new Promise((res, rej) => {
                taskQueue.push({file: file, key: Key,})
                res({ result: true })
                // let thread = new Worker("./lib/thread.js", {
                //     workerData: {
                //         file: file,
                //         key: Key,
                //     }
                // })
                // thread.on("error", err => {
                //     console.error("thread", err)
                // })
                // thread.on("exit", code => {
                //     if (code !== 0) console.error(`Worker stopped with exit code ${code}`)
                // })
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
        console.log('task complete');
        console.log(taskQueue)
        process.exit(0);
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });

