require('dotenv').config();
const AwsUploadFile = require('./CloudStorages/AWS');

module.exports = async ({ Key, file }) => {
    try {
        await AwsUploadFile(Key, file, process.env.AWS_BUCKET_NAME);

        return 'done';
    } catch (e) {
        console.log(e);
    }
};
