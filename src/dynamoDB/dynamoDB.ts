import { DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// Set the AWS Region.
const REGION = process.env.AWS_DEFAULT_REGION; //e.g. "us-east-2"
const KEY = process.env.AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// Create an Amazon DynamoDB service client object.

const ddbClient = new DynamoDBClient({ region: REGION , 
    credentials: {accessKeyId: KEY || "", secretAccessKey: SECRET_KEY || ""},},);
    
    const marshallOptions = {
        // Whether to automatically convert empty strings, blobs, and sets to `null`.
        convertEmptyValues: false, // false, by default.
        // Whether to remove undefined values while marshalling.
        removeUndefinedValues: true, // false, by default.
        // Whether to convert typeof object to map attribute.
        convertClassInstanceToMap: false, // false, by default.
    };
    
    const unmarshallOptions = {
        // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
        wrapNumbers: false, // false, by default.
    };
    
    const translateConfig = { marshallOptions, unmarshallOptions };
    
    // Create the DynamoDB Document client.
    const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);
    
    export { ddbDocClient };