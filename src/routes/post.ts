import { Request, Response } from 'express';
import PostDao from '../daos/Posts/PostDao';
import IPost from "@entities/Post"


const postDao = new PostDao();

/**
 * Route to get the global feed. Calles the PostDao to get the global feed.
 * 
 * @param res @param req 
 */
export async function getGlobalFeed(req: Request, res: Response){
  try {
    const posts = await postDao.getGlobalFeed();
    res.status(200).json(posts);
  } catch(err){
    res.status(500).json({err: "something went wrong"})
  }
}

/**
 * Route to get the create post. Calles the PostDao to create the post.
 * 
 * @param res @param req
 */
export async function createPost(req: Request, res: Response){
  try {
    const {post} = req.body;
    const newPost = await postDao.createPost(post);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

/**
 * Route to get the user feed. Calles the PostDao to get the users feed.
 * 
 * @param res @param req 
 */
export async function getUserFeed(req: Request, res: Response){
  try {
    const {userName} =  req.params;
    const posts = await postDao.getUserFeed(String(userName));
  } catch (err){
    res.status(500).json({err: "something went wrong"})
  }
}
/**
 * Route to delete a post. Calles the PostDao to delete the post.
 * 
 * @param res @param req 
 */
export async function deletePost(req: Request, res: Response){
  try {
    const {post} = req.body;
    console.log(post);
    await postDao.deletePost(post);
    res.status(200).json('Post was successfully deleted');
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}



