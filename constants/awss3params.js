const { v4: uuidv4 } = require('uuid');

const getParams = (fileType,file) => {
    //console.log(file);

    return {
        Bucket : process.env.AWS_BUCKET,
        Key : `${uuidv4()}.${fileType}`,
        Body: file.buffer
    }
};

module.exports = getParams;