import express from 'express';
import {
  CreateEditUser,
  DeleteUser,
  UserDetails,
  UserList
} from '../Controllers/UserController'; // Ensure this path is correct
import {
  register,
  login,
} from '../Controllers/AuthController'; // Ensure this path is correct

const userRouter = express.Router();

// Route to create or update a user
//userRouter.put('/upsert', CreateEditUser);

// Route for user registration
userRouter.post('/register', register);

// Route for user login
userRouter.post('/login', login);

// Route to get a list of all users (restricted access might be needed)
userRouter.get('/all', UserList);

// Route to get user details by ID
userRouter.get('/:id', UserDetails);

// Route to delete a user by ID
userRouter.delete('/:id', DeleteUser);

export default userRouter;
