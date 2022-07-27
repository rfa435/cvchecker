const moment   = require("moment-timezone")
const AWS      = require("aws-sdk")
const multer   = require("multer")

AWS.config.update({
    region          : process.env.AWS_DEFAULT_REGION,
    accessKeyId     : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const textract = new AWS.Textract()
const polly    = new AWS.Polly()
const s3       = new AWS.S3()

const response = (res, code, message, data=null) => {
    let dataJson = {
        statusCode : code,
        message : message
    }

    if(data !== null) {
        dataJson['data'] = data
    }

    return res.json(dataJson)
}

const curentTime = async () => {
    return await moment().tz("Asia/Jakarta").utc(true)
}

const storage = multer.memoryStorage()

const filterFile = (req, file, cb) => {
    if(file.mimetype.split("/")[0] === "images" && file.mimetype.split("/")[0] === "pdf") {
        cb(null, true)
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
    }
}

const uploads = multer({
    storage,
    filterFile
})

module.exports = {
    response,
    curentTime,
    uploads,
    dynamoDb,
    textract,
    polly,
    s3
}