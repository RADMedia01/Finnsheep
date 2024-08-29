import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';
import mongoose, { Error } from 'mongoose'; // Corrected import
import AppError from './../utils/AppError';

interface ErrorWithStatus extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  path?: string;
  value?: string;
  errmsg?: string;
  code?: number;
  errors?: { [key: string]: { message: string } };
}

const handleCastErrorDB = (err: ErrorWithStatus): AppError => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: MongoError): AppError => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: Error.ValidationError): AppError => { // Updated type
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (): AppError =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = (): AppError =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err: ErrorWithStatus, res: Response): void => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: ErrorWithStatus, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

export default (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err } as ErrorWithStatus;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error as MongoError);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error as Error.ValidationError); // Updated type
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
