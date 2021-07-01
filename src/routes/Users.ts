import User from '@entities/User';
import { Request, Response } from 'express';
import UserDao from '../daos/User/UserDao';

const userDao = new UserDao();


export async function createUser(req: Request, res: Response){
    try {
        const {user} = req.body;
        const target = await userDao.createUser(user)
        res.status(200).json("You were successful!")
        res.status(200).json(target);
    } catch(error){
        res.status(500).json({err:"something went wrong"})
    }
}

export async function getUser(req: Request, res: Response){
    try {
        const {userName} = req.params;
        const user = await userDao.getUser(userName);
        res.status(200).json(user);
    } catch(error){
        console.error(error);
        res.status(500).json({err:"something went wrong"})
    }
} 

export async function authenticate(req: Request, res: Response){
    try {
        const {userName, password} = req.params;
        const user = await userDao.authenticate(userName, password);
        res.status(200).json(user);
    } catch(error){
        console.error(error);
        res.status(500).json({err:"something went wrong"})
    }
}

export async function updateUser(req: Request, res: Response){
    try {
        const {user} = req.body;
        const target = await userDao.updateUser(user.loginToken || '', new User(user))
        res.status(200).json("You were successful!")
        res.status(200).json(target);
    } catch(error){
        res.status(500).json({err:"something went wrong"})
    }
}

export async function deleteUser(req: Request, res: Response){
    try {
        const {loginToken} = req.params
        const profile = await userDao.deleteUser(loginToken);
        res.status(200).json(`User ${req.params.displayName} was successfully deleted`);
        res.status(200).json(profile);
    } catch(error){
        res.status(500).json({err:"something went wrong"})
    }
}




