import PostDao from "../../daos/Posts/PostDao";
import { ddbDocClient as dynamo } from "../..//dynamoDB/dynamoDB";
import { DeleteCommand, PutCommand, GetCommand ,QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

afterAll(() => {
  dynamo.destroy();
});

const postDao = new PostDao();
const TABLENAME = "bg-posts";

const testPost = {
  userName: "admin",
  postTime: Date.now(),
  displayName: "captain",
  displayImg: "captain.png",
  postBody: "I am the captain now",
  postImg: "captainHat.png"
}
const {userName, postTime} = testPost;

test('it should create a post', async() => {
  const result = await postDao.createPost(testPost);

  const params = {
    TableName: TABLENAME,
    Key: {
      userName: userName,
      postTime: result
    }
  }
  console.log(result);
  const checkPost = await dynamo.send(new GetCommand(params))
  testPost.postTime = result;
  expect(checkPost.Item).toEqual(testPost)
})

test('it should get all posts for the global feed', async() => {
  
})