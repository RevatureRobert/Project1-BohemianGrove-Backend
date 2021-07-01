import IPostDao from "@daos/Posts/PostDao";
import IPost from "@entities/Post";

const dao: IPostDao = new IPostDao();

export function testCreate() {
    const post1: IPost = new IPost("luke s", 342, "IGN", "my image", "New Post", "Post image");
    const post2: IPost = new IPost("luke s", 434, "IGN", "my image", "New Post", "Post image");
    const post3: IPost = new IPost("luke s", 34234, "IGN", "my image", "New Post", "Post image");
    const post4: IPost = new IPost("luke s", 3434, "IGN", "my image", "New Post", "Post image");
    dao.createPost(post1);
    dao.createPost(post2);
    dao.createPost(post3);
    dao.createPost(post4);
}

export function testGetGlobalFeed(){
    dao.getGlobalFeed();
}

export function testDelete(){
    dao.deletePost(1130, "sam s");
}

export function testGetUserFeed(){
    dao.getUserFeed("luke s");
}