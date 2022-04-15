const path = require("path");
const fs = require("fs");
const readdir = require("recursive-readdir");
const Workers = require('piscina');
const os = require('os')

const rootFolder = path.resolve(__dirname, '../');

// get array of path to files, that we need to upload
function getFiles(dirPath) {
    return fs.existsSync(dirPath) ? readdir(dirPath) : [];
}

class FileUploader{
    #uploadServices =[] // services where we will upload files

    // worker threads pool, with queue
    #workerPool = new Workers({
        filename: path.resolve(__dirname, 'thread.js'), // path to worker instructions
        maxThreads: os.cpus().length    // config max amount of threads
    });

    constructor() {

    }

    // addFileUploadService(serviceInstance){
    //     this.uploadServices.push(serviceInstance);
    // }

    async uploadContent(uploadFolder){
        const filesToUpload = await getFiles(path.resolve(__dirname, uploadFolder));

        await Promise.all(filesToUpload.map(async file => {
            try{
                const Key = file.replace(`${rootFolder}/`, '');

                console.log(`uploading: [${Key}]`);
                await this.#workerPool.run({
                    file: file,
                    Key: Key,
                });

                console.log("remaining files amount :" +  this.#workerPool.queueSize)
            }catch (e){
                console.log(e)
                throw e
            }

        }))

    }
}
module.exports = FileUploader