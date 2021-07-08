/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createPost, deletePost, getGlobalFeed, getUserFeed } from './post';
import { updateUser, deleteUser, createUser, getUser, authenticate, searchUser } from './Users';


// User-route
const userRouter = Router();
userRouter.get('/:userName',getUser );
userRouter.post('/', createUser);
userRouter.post('/authenticate', authenticate);
userRouter.put('/', updateUser);
userRouter.delete('/:loginToken', deleteUser);
userRouter.get('/search/:search', searchUser);

//Post-route
const postRouter = Router();
postRouter.get('/', getGlobalFeed );
postRouter.get('/:userName', getUserFeed );
postRouter.post('/',createPost );
postRouter.delete('/', deletePost);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/posts', postRouter);
export default baseRouter;
