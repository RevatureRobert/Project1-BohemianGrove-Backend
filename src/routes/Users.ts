import User from '../entities/User';
import { Request, Response } from 'express';
import UserDao from '../daos/User/UserDao';

const userDao = new UserDao();

/**
 * Route to create a user. Calles the UserDao to create the post.
 * 
 * @param res @param req
 */
export async function createUser(req: Request, res: Response){
    try {
        const {user} = req.body;
        const target = await userDao.createUser(user)
        if (target.success) res.status(200).json(target);
        else res.status(400).json(target);
    } catch(error){
        res.status(400).json({err:error})
    }
}
/**
 * Route to get the user. Calles the UserDao to get the user.
 * 
 * @param res @param req 
 */
export async function getUser(req: Request, res: Response){
    try {
        const {userName} = req.params;
        const user = await userDao.getUser(userName);
        if (user.success) res.status(200).json(user);
        else res.status(400).json(user);
    } catch(error){
        res.status(400).json({err:"something went wrong"})
    }
} 
/**
 * Route to check if the users login matches the one in the database, 
 * and then logs them in if they are
 *   
 * @param res @param req 
 */
export async function authenticate(req: Request, res: Response){
    try {
        const {userName, password} = req.body;
        const user = await userDao.authenticate(userName, password);
        if (user.success) res.status(200).json(user);
        else res.status(400).json(user)
    } catch(error){
        res.status(400).json({err:"something went wrong"})
    }
}

/**
 * Route to update the users information in the database.
 * 
 * @param res @param req 
 */
export async function updateUser(req: Request, res: Response){
    try {
        const {user, loginToken} = req.body;
        const target = await userDao.updateUser(loginToken, new User(user))
        if (target.success) res.status(200).json(target);
        else res.status(400).json(target);
    } catch(error){
        res.status(400).json({err:error})
    }
}

/**
 * Route to delete a user. Calles the UserDao to delete the user.
 * 
 * @param res @param req 
 */

export async function deleteUser(req: Request, res: Response){
    try {
        const {loginToken} = req.params
        const profile = await userDao.deleteUser(loginToken);
        if (profile.success) res.status(200).json(profile);
        else res.status(400).json(profile);
    } catch(error){
        res.status(400).json({err:"something went wrong"})
    }
}




