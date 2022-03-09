const AWS = require('aws-sdk');

const S3_BUCKET = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'ap-south-1'
});

module.exports = {S3_BUCKET};