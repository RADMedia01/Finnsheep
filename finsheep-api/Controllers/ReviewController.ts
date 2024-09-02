import { Request, Response, NextFunction } from 'express';
import Review from './../Models/Review';
import * as factory from './HandlerFactory';
// import catchAsync from './../utils/catchAsync';


// Middleware to set tour and user IDs
export const setTourUserIds = (req: Request, res: Response, next: NextFunction) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id; // Ensure req.user is typed correctly
  next();
};

// Export functions from handlerFactory for Review model
export const GetAllReviews = factory.getAll(Review);
export const GetReview = factory.getOne(Review);
export const CreateReview = factory.createOne(Review);
export const UpdateReview = factory.updateOne(Review);
export const DeleteReview = factory.deleteOne(Review);