import { Request, Response } from 'express';
import UserDao from '../daos/User/UserDao';

const userDao = new UserDao();


export async function createUser(req: Request, res: Response){
    try {
        const user = await userDao.createUser(req.body)
        res.status(200).json("You were successful!")
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({err:"something went wrong"})
    }
}

export async function getUser(req: Request, res: Response){
    try {
        const user = await userDao.getUser(req.body);
        res.status(200).json(user);
    } catch(error){
        console.error(error);
        res.status(500).json({err:"something went wrong"})
    }
} 

export async function authenticate(req: Request, res: Response){
    try {
        const user = await userDao.authenticate(req.params);
        res.status(200).json(user);
    } catch(error){
        console.error(error);
        res.status(500).json({err:"something went wrong"})
    }
}

export async function updateUser(req: Request, res: Response){
    try {
        const user = await userDao.updateUser(req.body)
        res.status(200).json("You were successful!")
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({err:"something went wrong"})
    }
}

export async function deleteUser(req: Request, res: Response){
    try {
        const profile = await userDao.deleteUser(req.params);
        res.status(200).json(`User ${req.params.displayName} was successfully deleted`);
        res.status(200).json(profile);
    } catch(error){
        res.status(500).json({err:"something went wrong"})
    }
}




