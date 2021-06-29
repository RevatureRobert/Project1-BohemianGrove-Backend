export interface IPost {
    postUser: string;
    postTime: number;
    displayName: string
    displayImage: string
    postBody: string
    postImg: string
}

class Post implements IPost {

    public postUser: string;
    public postTime: number;
    public displayName: string
    public displayImage: string
    public postBody: string
    public postImg: string


    constructor(user: string, time: number, dName: string, dImage: string, body: string, pImage: string ) {

        this.postUser = user;
        this.postTime = time;
        this.displayName = dName;
        this.displayImage = dImage;
        this.postBody = body;
        this.postImg = pImage;
    }
}

export default Post;
