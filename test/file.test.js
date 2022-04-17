require('dotenv').config();

const path = require('path');
const { getFiles, FileUploader } = require('../lib/FileUploader');

const testUploadFolderName = path.join(__dirname, 'fileToUploadTest');

beforeAll(() => {
    jest.setTimeout(15000);
});

describe('FileUploader module', () => {
    test('Get all files path, that are in upload folder', async () => {
        const resultGetFiles = await getFiles(testUploadFolderName);
        const amountOfCreatedFiles = 3;
        expect(resultGetFiles).toBeInstanceOf(Array);
        expect(resultGetFiles.length).toBe(amountOfCreatedFiles);
    });

    test('File Uploader wrong path to folder', async () => {
        try {
            const fileUploader = new FileUploader({});
            await fileUploader.uploadContent('someWrongPath');
        } catch (e) {
            expect(e).toBe('Folder does not exist');
        }
    });

    test('File Uploader correct path to folder', async () => {
        try {
            const fileUploader = new FileUploader({});
            await fileUploader.uploadContent(testUploadFolderName);
        } catch (e) {
            expect(e).toBe(null);
        }
    });
});
