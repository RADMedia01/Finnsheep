import express from 'express';
const blogRouter=express.Router();
import { AddUpdateBlog,
    DeleteBlog,
    GetBlog,
    GetBlogList,
    CreateBlog,
    UpdateBlog
    } from '../Controllers/BlogController';


//blogRouter.put(`/upsert`,AddUpdateBlog)
blogRouter.get('/:id',GetBlog).delete('/:id',DeleteBlog)
blogRouter.get('',GetBlogList)
//blogRouter.get('/dropdown/list',CategoryDropdown)
blogRouter.post('/', CreateBlog)
blogRouter.put('/:id', UpdateBlog)


export default blogRouter
