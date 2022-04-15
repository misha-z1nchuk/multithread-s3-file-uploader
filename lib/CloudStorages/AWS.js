const S3 = require('aws-sdk/clients/s3');
const stream = require("stream");
const fs = require("fs");


const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY
});


async function AwsUploadFile(Key, file, Bucket){
    let pass = new stream.PassThrough();
    fs.createReadStream(file).pipe(pass)
    await s3.upload({
        Key,
        Bucket: Bucket,
        Body: pass,
    }).promise()
}
module.exports = AwsUploadFile;