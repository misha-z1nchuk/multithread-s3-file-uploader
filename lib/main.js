const fs = require('fs')
const readdir = require('recursive-readdir');
const async = require('async');
const path = require('path');


const rootFolder = path.resolve(__dirname, '../');
const uploadFolder = '../folder_to_upload';

const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
    region: "us-east-1",
    accessKeyId: "AKIAXTO63YV4V37FXYUD",
    secretAccessKey: "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"
})


function getFiles(dirPath) {
    return fs.existsSync(dirPath) ? readdir(dirPath) : [];
}

console.time("time")

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
                s3.upload({
                    Key,
                    Bucket: 'file-upload-test-task',
                    Body: fs.createReadStream(file),
                }, (err) => {
                    if (err) {
                        return rej(new Error(err));
                    }
                    res({ result: true });
                });
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
        console.timeEnd('test')
        console.log('task complete');
        process.exit(0);
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });

