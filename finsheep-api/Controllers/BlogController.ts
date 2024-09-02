import { Blogs } from '../Models/Blogs';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as factory from '../Controllers/HandlerFactory';

const CreateBlog = factory.createOne(Blogs);
const DeleteBlog = factory.deleteOne(Blogs);
const GetBlog = factory.getOne(Blogs);
const UpdateBlog = factory.updateOne(Blogs);

//
let AddUpdateBlog=async(req:Request, res:Response)=>{
  //body {title,body,author,publishDate} 
    let isUpdate:boolean = false;
  try {
    if(req.body._id){
        isUpdate=true;
        //update
        let blogObj=await Blogs.findByIdAndUpdate(req.body._id,
            { $set: {
                ...req.body,
                modifiedOn:Date.now()
            } }
        );
    }
    else{
        //add 
        let model=await Blogs.create({
            title:req.body.title,
            body:req.body.body,
            author:req.body.author,
            publishDate:req.body.publishDate,
            thumbNail:req.body.thumbNail
        })
    }
    return res.status(200).json({
        success:true,
        message:`Blog ${isUpdate ? `updated`:`added`} successfully!`
      })
  } catch (err:any) {
    return res.status(500).json({
      success:false,message:err.stack
    })
  }
}


// let DeleteBlog=async(req:Request, res:Response)=>{
//   const {id} =req.params;
//   try {
//     if(!id){
//       return res.status(500).json({
//         success:false,message:`Provide id`
//       });
//     }
//     let blogObj=await Blogs.findById(id);

//     if(blogObj){
//       let removeBlog = await Blogs.deleteOne({_id:id});
//       if(removeBlog){
//         return res.status(200).json({
//           success:false,message:`User details deleted successfully`
//         });
//       }
//     }
//     else{
//       return res.status(500).json({
//         success:false,message:`User Details not found!`
//       });
//     }



    
//   } catch (err:any) {
//     return res.status(500).json({
//       success:false,message:err.stack
//     })
//   }
// }

// let GetBlog=async(req:Request, res:Response)=>{
//   const {id} =req.params;
//   try {
//     if(!id){
//       return res.status(500).json({
//         success:false,message:`Provide id`
//       })
//     }

//     let blogDetails=await Blogs.findById(id);
//     if(blogDetails){
//       //let userObj={...userDetails,user:}
//       return res.status(200).json({
//         success:true,data:blogDetails
//       })
//     }
//     else{
//       return res.status(200).json({
//         success:true,data:{}
//       })
//     }
    
    
//   } catch (err:any) {
//     return res.status(500).json({
//       success:false,message:err.stack
//     })
//   }
// }

let GetBlogList = async(req:Request, res:Response)=>{
  const limit=Number(req.query.limit) || 5;
  const search=String(req.query.search) || "";
  const page=Number(req.query.page) || 1;

  try {
    let blogList = await Blogs.find({ title: { $regex: search, $options: "i" }})
    .sort({ modifiedOn: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
   
    let totalBlogsCount=await Blogs.find().countDocuments();

    return res.status(200).json({ 
      success: true, 
      data: blogList,
      currentPage:page,
      totalCount: totalBlogsCount,
     });
  } catch (err: any) {
    return res.status(500).json({ title: `Error`, message: `${err.stack}` });
  }
}

export {
  AddUpdateBlog,
  DeleteBlog,
  GetBlog,
  GetBlogList,
  CreateBlog,
  UpdateBlog
}
