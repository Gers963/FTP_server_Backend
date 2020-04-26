const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cd (err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            })
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/bmp',
            'application/pdf',
            'application/vnd.cups-ppd',
            'audio/mp3',
            'video/mp4',
            'video/x-msvideo',
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error("arquivo invalido"))
        }
    }
};