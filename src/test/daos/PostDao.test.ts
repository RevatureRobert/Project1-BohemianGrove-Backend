import PostDao from "../../daos/Posts/PostDao";
import { ddbDocClient as dynamo } from "../..//dynamoDB/dynamoDB";
import {PutCommand, GetCommand ,QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import Post from "../../entities/Post";

afterAll(() => {
  dynamo.destroy();
});

const postDao = new PostDao();
const TABLENAME = "bg-posts";

const testPost1 = {
  userName: "admin",
  postTime: Date.now(),
  displayName: "captain",
  displayImg: "captain.png",
  postBody: "I am the captain now",
  postImg: "captainHat.png"
}

const testPostInDB = {
  userName: "admin",
  postTime: 1625693461448,
  displayName: "captain",
  displayImg: "captain.png",
  postBody: "I am the captain now",
  postImg: "captainHat.png"
}

const {userName} = testPost1;
const {postTime} = testPostInDB;

test('it should create a post', async() => {
  const result = await postDao.createPost(testPost1);
  const params = {
    TableName: TABLENAME,
    Key: {
      userName: userName,
      postTime: result
    }
  }

  const checkPost = await dynamo.send(new GetCommand(params));
  testPost1.postTime = result;

  const post = new Post(testPost1);
  expect(checkPost.Item).toEqual(post);
})

test('it should get all posts for the global feed', async() => {
  const putParams = {
    TableName: TABLENAME,
    Item: testPostInDB
  }

  await dynamo.send(new PutCommand(putParams))

  const result = await postDao.getGlobalFeed();

  const params = {
    TableName: TABLENAME,
  }

  const checker = await dynamo.send(new ScanCommand(params));
  
  expect(checker.Items).toEqual(result);
})

test('it should get a user feed', async() => {
  const result = await postDao.getUserFeed(userName);

  const params = {
    TableName: TABLENAME,
    ExpressionAttributeValues:{ ":userName":  userName },
    KeyConditionExpression: "userName = :userName"
  }

  const checker = await dynamo.send(new QueryCommand(params));

  expect(checker.Items).toEqual(result);
})

test('it should be able to delete a post', async() => {
  const putParams = {
    TableName: TABLENAME,
    Item: testPostInDB
  }

  const getParams = {
    TableName: TABLENAME,
    Key: {
      userName: userName,
      postTime: postTime     
    }
  }

  await dynamo.send(new PutCommand(putParams))
  await postDao.deletePost(testPostInDB);
  const checker = await dynamo.send(new GetCommand(getParams))
  expect(checker.Item).toBeUndefined();
})
