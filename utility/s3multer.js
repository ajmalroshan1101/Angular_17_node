const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretKey = process.env.S3_ACCESS_SCERET_KEY;
const region = process.env.S3_REGOIN;
const myBucket = process.env.S3_BUCKET_NAME;


const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretKey,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: myBucket,
        metadata: function(req, file, cb) {

            cb(null, { filedName: file.fieldname });
        },
        key: function(req, file, cb) {

            cb(null, `image - ${ Date.now() }.jpeg`);
        },
    }),
});

module.exports = { upload, s3 };