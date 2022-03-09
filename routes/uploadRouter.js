const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {S3_BUCKET} = require('../utilities/aws.js');
const getParams = require('../constants/awss3params.js');

router.post('/upload', asyncHandler((req,res) => {

    try {
        //console.log(S3_BUCKET);
        let myFile = req.file.originalname.split('.');
        const fileType = myFile[myFile.length -1];
        //console.log(fileType);
        const params = getParams(fileType,req.file);
        //console.log(params);

        S3_BUCKET.putObject(params, (error,data) => {

            if(error) {
                console.log(error);
                return res.json(error);
            }
            else {
                console.log('Data',data);
                return res.json(data);
            }
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}));

module.exports = router;