const { v4 } = require("uuid")
const { s3 } = require("../config")

const uploadToS3 = async (file) => {
    const params = {
        Bucket : process.env.AWS_BUCKET_NAME,
        Key    : `${v4()}-${file.originalname}`,
        Body   : file.buffer
    }

    return await s3.upload(params).promise()
}

module.exports = {
    uploadToS3
}