/* eslint-disable no-console */

require('dotenv').config();
const FileUploader = require('./FileUploader');

const uploadFolder = '../folder_to_upload';

const fileUploader = new FileUploader();

fileUploader.uploadContent(uploadFolder).then(() => {
    console.log('task complete');
    process.exit(0);
}).catch((err) => {
    console.error(err.message);
    process.exit(1);
});









//
// const rootFolder = path.resolve(__dirname, '../');
// const uploadFolder = '../folder_to_upload';
//
// const piscina = new Piscina({
//     filename: path.resolve(__dirname, 'thread.js'),
//     maxThreads: os.cpus().length
// });
//
// function getFiles(dirPath) {
//     return fs.existsSync(dirPath) ? readdir(dirPath) : [];
// }
//
//
// async function deploy(upload) {
//     // if (!BUCKET || !KEY || !SECRET) {
//     //     throw new Error('you must provide env. variables: [BUCKET, KEY, SECRET]');
//     // }
//
//     const filesToUpload = await getFiles(path.resolve(__dirname, upload));
//
//         await Promise.all(filesToUpload.map(async file => {
//             try{
//                 const Key = file.replace(`${rootFolder}/`, '');
//                 console.log(`uploading: [${Key}]`);
//                 let result = await piscina.run({
//                     file: file,
//                     Key: Key,
//                 })
//                 console.log(result)
//                 console.log("remaining files amount :" +  piscina.queueSize)
//             }catch (e){
//                 console.log(e)
//                 throw e
//             }
//
//         }))
// }
//
// deploy(uploadFolder)
//     .then(() => {
//         console.log('task complete');
//         process.exit(0);
//     })
//     .catch((err) => {
//         console.error(err.message);
//         process.exit(1);
//     });
//
