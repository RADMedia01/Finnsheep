import express from 'express';
const blogRouter=express.Router();
import { AddUpdateBlog,
    DeleteBlog,
    GetBlog,
    GetBlogList,
    } from '../Controllers/BlogController';


blogRouter.put(`/upsert`,AddUpdateBlog)
blogRouter.get('/:id',GetBlog).delete('/:id',DeleteBlog)
blogRouter.get('',GetBlogList)
//blogRouter.get('/dropdown/list',CategoryDropdown)


export default blogRouter
