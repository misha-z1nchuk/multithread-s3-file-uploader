import fs from "fs";


const S3 = require('aws-sdk/clients/s3');
const { workerData, parentPort } = require("worker_threads")

const s3 = new S3({
    region: "us-east-1",
    accessKeyId: "AKIAXTO63YV4V37FXYUD",
    secretAccessKey: "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"
})

try{
    const Key = workerData.Key;
    const file = workerData.file;
    s3.upload({
        Key,
        Bucket: 'file-upload-test-task',
        Body: fs.createReadStream(file),
    }, (err) => {
        if (err) {
            console.log("err uploading file")
        }
    });

}catch (e){
    console.log(e.code)
    console.log(e.msg)
}


