import express from 'express';
const userRouter=express.Router();
import {  CreateEditUser,
    DeleteUser,
    Login,
    UserDetails,
    AdminLogin,
    UserList} from '../Controllers/UserController';


userRouter .put(`/upsert`,CreateEditUser)
userRouter .post(`/login`,Login)
userRouter.post(`/admin-login`,AdminLogin)
userRouter.get('/all',UserList)
userRouter .get('/:id',UserDetails).delete('/:id',DeleteUser)


export default userRouter 
