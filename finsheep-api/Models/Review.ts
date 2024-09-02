import mongoose, { Document, Schema } from 'mongoose';
import { Product } from './Product';

import { Users } from './Users';


// Interface for Review schema
interface IReview extends Document {
  review: string;
  rating: number;
  createdAt?: Date;
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

// Review schema definition
const reviewSchema: Schema<IReview> = new Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty!']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Review must belong to a product.']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'Review must belong to a user']
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Unique index for preventing duplicate reviews by the same user for the same product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Pre-find middleware to populate user and product information
reviewSchema.pre(/^find/, function(this: mongoose.Query<IReview[], IReview>, next) {
    this.populate({
      path: 'user',
      select: 'name' // Specify fields to select if needed
    });
  
    next();
  });

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;
