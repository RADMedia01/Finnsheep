import express from 'express';
const reviewRouter=express.Router();
import { CreateReview,
    UpdateReview,
    GetReview,
    DeleteReview,
    GetAllReviews
    } from '../Controllers/ReviewController';


//reviewRouter.put(`/upsert`,AddUpdateBlog)
reviewRouter.get('/:id',GetReview).delete('/:id',DeleteReview)
reviewRouter.get('',GetAllReviews)
//reviewRouter.get('/dropdown/list',CategoryDropdown)
reviewRouter.post('/', CreateReview)
reviewRouter.put('/:id', UpdateReview)


export default reviewRouter