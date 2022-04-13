const Queue = require('bee-queue');
export const queue = new Queue('files-for-upload');

queue.process(function (job, done){
    console.log(`processing job ${job}`)
    return done(null, job.data.key)
})


