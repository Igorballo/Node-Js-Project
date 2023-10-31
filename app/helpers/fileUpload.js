const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileUpload = (file, destinationPath) => {
    return new Promise((resolve, reject) => {
        const uniqueFilename = uuidv4() + path.extname(file.name);
        const fullPath = path.join(destinationPath, uniqueFilename);

        file.mv(fullPath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(uniqueFilename);
            }
        });
    });
};

module.exports = { uploadFile: fileUpload };