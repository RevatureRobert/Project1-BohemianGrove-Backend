/* eslint-disable no-useless-catch */
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


     /**
     * Gets the global feed from the database.
     * 
     * @returns an array of Post objects.
     */
    public async getGlobalFeed(): Promise<Post[]> {
        const params = {
            TableName: TABLE_NAME
        }
        let feed: Post[] = [];
        try {
            const data = await ddbDocClient.send(new ScanCommand(params));
            return data.Items as Post[];
        } catch (err) {
            throw(err);
        } 
    }
    
     /**
     * Gets all of the posts from a specific user from the database.
     * @param {string} name - The users name.
     * @returns an array of Post objects.
     */
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
            throw(err);
        } 
        
    }
     /**
     * Creates a new post from a post object.
     * 
     * @param {IPost} post - The post object to create 
     * @returns the post time of the object.
     */
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
            return time;
        } catch (err) {
            throw(err);
        }
    }

     /**
     * Delete a post from the database.
     * 
     * @param {Post} post - post object to delte
     * @returns true if it deletes the post, false if not.
     */

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
            return true;
        } catch (err) {
            return false;
        }
    }
}

export default PostDao;