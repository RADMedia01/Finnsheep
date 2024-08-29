import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Users } from '../Models/Users';
import  catchAsync  from '../utils/CatchAsync';
import  AppError  from '../utils/AppError';

// JWT secret and expiration values
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '90d';

// Sign a JWT token
const signToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Register a new user
export const register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, mobile, password, role, address, picture } = req.body;

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await Users.create({
    name,
    email,
    mobile,
    password: hashedPassword,
    role,
    address,
    picture,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

// Log in an existing user
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await Users.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

// Protect middleware (for authenticated routes)
export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  req.user = currentUser;
  next();
});

// Middleware to restrict routes to specific roles
export const restrictTo = (...roles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
