export interface IPost {
    userName: string;
    postTime: number;
    displayName: string
    displayImg: string
    postBody: string
    postImg: string
}

export class Post implements IPost {

    public userName: string;
    public postTime: number;
    public displayName: string
    public displayImg: string
    public postBody: string
    public postImg: string


    constructor(userOrPost: any,) {
        this.userName = userOrPost.userName;
        this.postTime = userOrPost.postTime;
        this.displayName = userOrPost.displayName;
        this.displayImg = userOrPost.displayImg;
        this.postBody = userOrPost.postBody;
        this.postImg = userOrPost.postImg;
    }
}

export default Post;
