import  Users  from '../Models/Users';

declare global {
  namespace Express {
    interface Request {
      user?: Users; 
    }
  }
}
