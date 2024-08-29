// src/types/express.d.ts
import { User } from '../Models/Users'; // Adjust the import path as needed

declare global {
  namespace Express {
    interface Request {
      user?: User; // Adjust the type if your user model is different
    }
  }
}
