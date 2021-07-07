import { IUser, User } from '../../entities/User';
import Response from '../../entities/Response'
import {
    DeleteCommand,
    DeleteCommandInput,
    GetCommand,
    GetCommandInput,
    GetCommandOutput,
    PutCommand,
    PutCommandInput,
    PutCommandOutput,
    QueryCommand,
    QueryCommandInput,
    UpdateCommand,
    UpdateCommandInput
} from '@aws-sdk/lib-dynamodb';
import { ddbDocClient as dynamo } from '../../dynamoDB/dynamoDB';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

const TABLE_NAME = "bg-users";

export interface IUserDao {
    createUser: (user: IUser) => Promise<Response>;
    getUser: (userName: string) => Promise<Response>;
    authenticate: (userName: string, password: string) => Promise<Response>;
    updateUser: (loginToken: string, user: User) => Promise<Response>;
    deleteUser: (loginToken: string) => Promise<Response>;
    checkToken: (loginToken: string) => Promise<Response>;
}

class UserDao implements IUserDao {


    /**
     * Creates a new user from a user object.
     * 
     * @param user 
     * @returns a response object containing a full user object.
     */
    public async createUser(user: IUser): Promise<Response> {
        try {
            const newToken = uuid();
            user.loginToken = newToken;

            if (!user.password) return new Response(false, 'User did not provide a password.');

            const passwordHash = await bcrypt.hash(user.password, 10);
            user.password = passwordHash;

            const params: PutCommandInput = {
                TableName: TABLE_NAME,
                Item: user,
            }
            
            const result: PutCommandOutput = await dynamo.send(new PutCommand(params));

            user.password = undefined;
            return new Response(true, user);
        } catch (err) {
            return new Response(false, err);
        }
    }


    /**
     * Gets a user's basic information.
     * 
     * @param userName 
     * @returns a response object containing a cleansed user object.
     */
    public async getUser(userName: string): Promise<Response> {
        const params: GetCommandInput = {
            TableName: TABLE_NAME,
            Key: {
                userName
            }
        }

        const result: GetCommandOutput = await dynamo.send(new GetCommand(params));

        if (!result.Item) return new Response(false, "A user with that name was not found.");

        return new Response(true, new User(result.Item).cleansed());
    }


    /**
     * Checks whether a given user name and password match.
     * 
     * @param userName 
     * @param password 
     * @returns a response object containing a full user object.
     */
    public async authenticate(userName: string, password: string): Promise<Response> {
        const params: GetCommandInput = {
            TableName: TABLE_NAME,
            Key: {
                userName
            }
        }

        const userResponse = await dynamo.send(new GetCommand(params));
        if (!userResponse.Item) return new Response(false, "A user with that name was not found.");

        const checkHash = await bcrypt.hash(password, 10);
        const success = await bcrypt.compare(userResponse.Item.password, checkHash);

        if (success) return new Response(true, new User(userResponse.Item));

        return new Response(false, "Incorrect password.");
    }


    /**
     * Updates a user's profile.
     * 
     * @param loginToken 
     * @param user 
     * @returns a response object containing the full updated user object.
     */
    public async updateUser(loginToken: string, user: User): Promise<Response> {
        const tokenCheck = await this.checkToken(loginToken);
        if (!tokenCheck.success) return tokenCheck;

        const updatedUser = new User({
            ...tokenCheck.data,
            ...user
        });

        const params: UpdateCommandInput = {
            TableName: TABLE_NAME,
            Key: {
                userName: tokenCheck.data.userName
            },
            ExpressionAttributeValues: {
                ":u": updatedUser.userName,
                ":d": updatedUser.displayName,
                ":e": updatedUser.email,
                ":i": updatedUser.profileImg
            },
            UpdateExpression: "userName = :u, displayName = :d, email = :e, profileImg = :i",
            ReturnValues: "ALL_NEW"
        }

        const result = await dynamo.send(new UpdateCommand(params));

        if (!result.Attributes) return new Response(false, result);

        return new Response(true, new User(result.Attributes));
    }


    /**
     * Deletes a user.
     * 
     * @param loginToken 
     * @returns a response object with a success indicator.
     */
    public async deleteUser(loginToken: string): Promise<Response> {
        const tokenCheck = await this.checkToken(loginToken);
        if (!tokenCheck.success) return tokenCheck;

        const params: DeleteCommandInput = {
            TableName: TABLE_NAME,
            Key: {
                userName: tokenCheck.data.userName
            }
        }

        await dynamo.send(new DeleteCommand(params));

        return new Response(true, "User was deleted successfully.");
    }


    /**
     * Verifies a given login token.
     * 
     * @param loginToken 
     * @returns a response object containing a full user object.
     */
    public async checkToken(loginToken: string): Promise<Response> {
        const params: QueryCommandInput = {
            TableName: TABLE_NAME,
            ExpressionAttributeValues: {
                ":token": loginToken
            },
            KeyConditionExpression: "loginToken = :token"
        }

        const result = await dynamo.send(new QueryCommand(params));

        if (!result.Count || !result.Items) return new Response(false, "Invalid login token.");
        if (result.Count > 1) return new Response(false, "Duplicate tokens exist in the databse.");

        return new Response(true, new User(result.Items));
    }
}

export default UserDao;
