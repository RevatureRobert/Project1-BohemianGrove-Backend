export default {
  tables: [
    {
      TableName: "bg-posts",
      KeySchema: [{ AttributeName: "userName", KeyType: "HASH" }],
      AttributeDefinitions: [
        { AttributeName: "userName", AttributeType: "S" },
        { AttributeName: "postTime", AttributeType: "N" }
    ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
    {
      TableName: "bg-users",
      KeySchema: [{ AttributeName: "userName", KeyType: "HASH" }],
      AttributeDefinitions: [
              { AttributeName: "userName", AttributeType: "S" },
              { AttributeName: "loginToken", AttributeType: "S" }
            ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "loginToken-index",
          KeySchema: [
            {
              AttributeName: "loginToken",
              KeyType: "HASH"
            }
          ],
          Projection: {
            ProjectionType: "ALL"
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    }
  ],
  basePort: 8000,
};