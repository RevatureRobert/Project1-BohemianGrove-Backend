export interface IPost {
    userName: string;
    postTime: number;
    displayName: string
    displayImg: string
    postBody: string
    postImg: string
}

class Post implements IPost {

    public userName: string;
    public postTime: number;
    public displayName: string
    public displayImg: string
    public postBody: string
    public postImg: string


    constructor(userOrPost: string| any, time?: number, dName?: string, dImage?: string, body?: string, pImage?: string) {

        if(typeof userOrPost === "string"){
            this.userName = userOrPost;
            this.postTime = time || 0;
            this.displayName = dName || "";
            this.displayImg = dImage || "";
            this.postBody = body || "";
            this.postImg = pImage || "";
            
        }
        else{
            this.userName = userOrPost.postUser;
            this.postTime = userOrPost.postTime;
            this.displayName = userOrPost.displayName;
            this.displayImg = userOrPost.dImage;
            this.postBody = userOrPost.postBody;
            this.postImg = userOrPost.postImage;
        }
    }
}

export default Post;
