import { IUser } from "@entities/User";
import { IPost } from "@entities/Post";

declare module 'express' {
    export interface Request  {
        body: {
            post: IPost
            user: IUser 
            userName: string
            password: string
            loginToken: string
        };
    }
}
