export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "cvchecker": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "predictions": {
        "cvchecker": {
            "region": "string",
            "format": "string"
        },
        "pollyresult": {
            "region": "string",
            "language": "string",
            "voice": "string"
        }
    },
    "api": {
        "cvchecker": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "storagecv": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}