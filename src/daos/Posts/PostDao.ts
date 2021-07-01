import { DeleteCommand, PutCommand, QueryCommandInput,QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import  IPost  from "@entities/Post";
import  IUser  from "@entities/User";
import { ddbDocClient } from "src/dynamoDB/dynamoDB";

const TABLE_NAME = 'bg-posts'


export interface IPostDao {
    getGlobalFeed: () => Promise<IPost[]>;
    getUserFeed: (user: string) => Promise<IPost[]>;
    createPost: (post: IPost) => Promise<IPost>;
    deletePost: (time: number, user: string) => Promise<boolean>;
}

class PostDao implements IPostDao{

    public async getGlobalFeed(): Promise<IPost[]> {
        const params = {
            TableName: TABLE_NAME
        }
        const feed: IPost[] = [];
        try {
            const data = await ddbDocClient.send(new ScanCommand(params));
            data.Items?.forEach(function (element) {
                let post = new IPost(String(element.userName), Number(element.postTime), String(element.displayName), 
                    String(element.dispplayImg), String(element.postBody), String(element.postImg));
                feed.push(post);
                
              });
              console.log("Got the global feed", feed);
              return feed;
          } catch (err) {
            console.log("Error", err);
          } 
          return feed;
    }

    public async getUserFeed(user: string): Promise<IPost[]>{

        const userFeed: IPost[] = [];
        const params:QueryCommandInput = {
            TableName: TABLE_NAME,
            ExpressionAttributeValues:{ ":userName":  user },
            KeyConditionExpression: "userName = :userName"
        }
        try {
            const data = await ddbDocClient.send(new QueryCommand(params));
            data.Items?.forEach(function (element) {
                let post = new IPost(String(element.userName), Number(element.postTime), String(element.displayName), 
                    String(element.dispplayImg), String(element.postBody), String(element.postImg));
                userFeed.push(post);
                
              });
              console.log("Got the user feed", userFeed);
              return userFeed;
          } catch (err) {
            console.log("Error", err);
          } 
        return userFeed;
    }
    
    public async createPost(post: IPost): Promise<any>{
        const params = { 
            TableName: TABLE_NAME,
              
            Item:{
                userName: post.postUser,
                postTime: post.postTime,
                displayName: post.displayName,
                displayImg: post.displayImage,
                postBody: post.postBody,
                postImg: post.postImg
            }
        }
        try {
            const data = await ddbDocClient.send(new PutCommand(params));
            console.log("Success - item added or updated", data);
            return data;
          } catch (err) {
            console.log("Error", err);
          }
    }

    public async deletePost(time: number, user: string): Promise<boolean>{
        
        const params = { 
            TableName: TABLE_NAME,
              
            Key:{
                userName:user,
                postTime:time
            }
        }
        try {
            const data = await ddbDocClient.send(new DeleteCommand(params));
            console.log("Success - item deleted", data);
            return true;
          } catch (err) {
            console.log("Error", err);
            return false;
          }
    }
}

export default PostDao;