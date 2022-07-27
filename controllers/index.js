const config    = require("../config")
const { v4 }    = require("uuid")
const { uploadToS3 } = require("../lib")

const apiControllers = {
    index : async (req, res, next) => {
        try {
            let _id         = v4()
            let totalScore  = 50
            let detailScore = {
                linkedin       : true,
                email          : true,
                internship     : false
            }
            const roleName  = req.body.roleName

            if(roleName === "Sales") {
                detailScore['business']      = false
                detailScore['communication'] = false
                detailScore['accounts']      = false
                detailScore['client']        = false
            
            } else if(roleName === "Solutions Architect") {

                detailScore['project']      = false
                detailScore['supervised']   = false
                detailScore['leader']       = false
                detailScore['solutionsarchitect']  = false
            }
            
            const uploadedFile = await uploadToS3(req.file)
            const document = {
                Document : {
                    S3Object : {
                        Bucket : process.env.AWS_BUCKET_NAME,
                        Name   : uploadedFile.key
                    }
                },
                FeatureTypes : [ "FORMS" ]
            }

            config.textract.analyzeDocument(document, async (err, data) => {
                if(err) {
                    return config.response(res, 400, err)
                } else {

                    const dataArray = data.Blocks.filter(i => i.BlockType === "LINE").map(i => i.Text)
                    let arrayData = {
                        email           : [],
                        linkedin        : [],
                        internship      : [],
                        
                        client          : [],
                        business        : [],
                        communication   : [],
                        accounts        : [],

                        project            : [],
                        solutionsarchitect : [],
                        leader             : [],
                        supervised         : []
                    }

                    for(const l in dataArray) {
                        if(dataArray[l].indexOf("@") !== -1 || dataArray[l].indexOf("email") !== -1) {
                            arrayData.email.push(dataArray[l])
                        }
                
                        if(dataArray[l].indexOf("linkedin.com/in") !== -1 || dataArray[l].indexOf("linkedin.com") !== -1) {
                            arrayData.linkedin.push(dataArray[l])
                        }
                        
                        if(dataArray[l].indexOf("internship") !== -1 || dataArray[l].indexOf("Internship") !== -1) {
                            arrayData.internship.push(dataArray[l])
                        }

                        // sales
                            if(dataArray[l].indexOf("client") !== -1 || dataArray[l].indexOf("Client") !== -1) {
                                arrayData.client.push(dataArray[l])
                            }
                    
                            if(dataArray[l].indexOf("business") !== -1 || dataArray[l].indexOf("Business") !== -1) {
                                arrayData.business.push(dataArray[l])
                            }
                    
                            if(dataArray[l].indexOf("communication") !== -1 || dataArray[l].indexOf("Communication") !== -1) {
                                arrayData.communication.push(dataArray[l])
                            }
                    
                            if(dataArray[l].indexOf("accounts") !== -1 || dataArray[l].indexOf("Accounts") !== -1) {
                                arrayData.accounts.push(dataArray[l])
                            }
                        // end-sales

                        // Solutions Architect
                        if(dataArray[l].indexOf("project") !== -1 || dataArray[l].indexOf("Project") !== -1) {
                            arrayData.project.push(dataArray[l])
                        }

                        if(dataArray[l].indexOf("solutions architect") !== -1 || dataArray[l].indexOf("Solutions Architect") !== -1) {
                            arrayData.solutionsarchitect.push(dataArray[l])
                        }

                        if(dataArray[l].indexOf("leader") !== -1 || dataArray[l].indexOf("Leader") !== -1) {
                            arrayData.leader.push(dataArray[l])
                        }

                        if(dataArray[l].indexOf("supervised") !== -1 || dataArray[l].indexOf("Supervised") !== -1) {
                            arrayData.supervised.push(dataArray[l])
                        }
                        // end Solutions Architect
                    }
                    
                    if(arrayData.email.length === 0) {
                        totalScore-=25
                        detailScore.email = false
                    }

                    if(arrayData.linkedin.length === 0) {
                        totalScore-=25
                        detailScore.linkedin = false
                    }

                    if(arrayData.internship.length > 0) {
                        totalScore+=10
                        detailScore.internship = true
                    }

                    // sales
                    if(roleName === "Sales") {
                        if(arrayData.business.length > 0) {
                            totalScore+=10
                            detailScore.business = true
                        }

                        if(arrayData.accounts.length > 0) {
                            totalScore+=10
                            detailScore.accounts = true
                        }

                        if(arrayData.client.length > 0) {
                            totalScore+=10
                            detailScore.client = true
                        }

                        if(arrayData.communication.length > 0) {
                            totalScore+=10
                            detailScore.communication = true
                        }
                    }
                    // end sales

                    // Solutions Architect
                    if(roleName === "Solutions Architect") {
                        if(arrayData.project.length > 0) {
                            totalScore+=10
                            detailScore.project = true
                        }

                        if(arrayData.solutionsarchitect.length > 0) {
                            totalScore+=10
                            detailScore.solutionsarchitect = true
                        }

                        if(arrayData.leader.length > 0) {
                            totalScore+=10
                            detailScore.leader = true
                        }

                        if(arrayData.supervised.length > 0) {
                            totalScore+=10
                            detailScore.supervised = true
                        }
                    }
                    // end Solutions Architect

                    let addSugest = []
                    for(const i in detailScore) {
                        if(detailScore[i] === false) {
                            addSugest.push(i)
                        }
                    }

                    const input = {
                        Text         : totalScore < 100 && totalScore > 0 ? `your score is ${totalScore.toString()} . to increase your score please add keywords ${addSugest.join(", ")}` : totalScore == 0 ? `seems like the file is not a CV, please choose another file!` : `congratulation your score is ${totalScore.toString()}. your cv is perfect`,
                        OutputFormat : "mp3",
                        VoiceId      : process.env.AWS_VOICE_ID,
                        LanguageCode : process.env.AWS_LANGUAGE_CODE
                    }
                
                    config.polly.synthesizeSpeech(input, async (err, data) => {
                        if (err) {
                            return config.response(res, 400, err)
                        }
                        
                        const result = await uploadToS3({
                            originalname : `text-speech.mp3`,
                            buffer       : data.AudioStream
                        })
                        
                        const items  = {
                            _id         : _id,
                            roleName    : roleName,
                            score       : totalScore.toString(),
                            detailScore : detailScore,
                            createdBy   : req.body.createdBy,
                            urlAudio    : 'https://d3uf0d90e7cid1.cloudfront.net/' + (result.Key)
                        }
                        
                        const params = {
                            TableName : process.env.AWS_TABLE_NAME,
                            Item      : items
                        }
                        
                        await config.dynamoDb.put(params).promise()
                        config.response(res, 201, "success", items)
                    })
                }
            })
        } catch (error) {
            config.response(res, 400, error.message)
        }     
    },

    history : async (req, res, next) => {
        try {
            const params = {
                TableName: process.env.AWS_TABLE_NAME
            }

            let dataResult = []
            const data = await config.dynamoDb.scan(params).promise()

            for(const i in data.Items) {
                if(data.Items[i].createdBy === req.params.user) {
                    dataResult.push(data.Items[i])
                }
            }
            
            config.response(res, 200, "success", dataResult)
        } catch (error) {
            config.response(res, 400, error.message)
        }

    }
}

module.exports = apiControllers