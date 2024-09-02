import { Request, Response, NextFunction } from 'express';
import Review from './../Models/Review';
import * as factory from './HandlerFactory';
// import catchAsync from './../utils/catchAsync';


// Middleware to set Product and user IDs
export const setProductUserIds = (req: Request, res: Response, next: NextFunction) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// Export functions from handlerFactory for Review model
export const GetAllReviews = factory.getAll(Review);
export const GetReview = factory.getOne(Review);
export const CreateReview = factory.createOne(Review);
export const UpdateReview = factory.updateOne(Review);
export const DeleteReview = factory.deleteOne(Review);