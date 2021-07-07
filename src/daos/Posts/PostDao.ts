import { DeleteCommand, PutCommand, QueryCommandInput,QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import  {Post, IPost}  from "../../entities/Post";
import { ddbDocClient } from "../../dynamoDB/dynamoDB";

const TABLE_NAME = 'bg-posts'


export interface IPostDao {
    getGlobalFeed: () => Promise<Post[]>;
    getUserFeed: (name: string) => Promise<Post[]>;
    createPost: (post: IPost) => Promise<Post>;
    deletePost: (post: IPost) => Promise<boolean>;
}

class PostDao implements IPostDao{

    public async getGlobalFeed(): Promise<Post[]> {
        const params = {
            TableName: TABLE_NAME
        }
        let feed: Post[] = [];
        try {
            const data = await ddbDocClient.send(new ScanCommand(params));
            return data.Items as Post[];
        } catch (err) {
            console.log("Error", err);
            return feed;
        } 
    }

    public async getUserFeed(name: string): Promise<Post[]>{

        const userFeed: Post[] = [];
    
        const params:QueryCommandInput = {
            TableName: TABLE_NAME,
            ExpressionAttributeValues:{ ":userName":  name },
            KeyConditionExpression: "userName = :userName"
        }
        try {
            const data = await ddbDocClient.send(new QueryCommand(params));
            return data.Items as Post[];
        } catch (err) {
            console.log("Error", err);
        } 
        return userFeed;
    }
    
    public async createPost(post: IPost): Promise<any>{
        const time = Date.now();
        const params = { 
            TableName: TABLE_NAME,
            
            Item:{
                userName: post.userName,
                postTime: time,
                displayName: post.displayName,
                displayImg: post.displayImg,
                postBody: post.postBody,
                postImg: post.postImg
            }
        }
        try {
            const data = await ddbDocClient.send(new PutCommand(params));
            console.log("Success - item added or updated");
            return time;
        } catch (err) {
            console.log("Error", err);
        }
    }

    public async deletePost(post: Post): Promise<boolean>{
        
        const params = { 
            TableName: TABLE_NAME,
    
            Key:{
                userName: post.userName,
                postTime: post.postTime
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