import { Request, Response, NextFunction } from "express";
import { Product } from "../Models/Product";
import { ProductImage } from "../Models/ProductImage";
import { baseUrl, FilePaths, rootDir } from "../Common/Common";
import fs from 'fs';
import  {ObjectId}  from 'mongodb';
import mongoose from "mongoose";
import { string } from "joi";


let AddUpdateProduct = async (req: Request, res: Response) => {
  let isUpdate: boolean = false;
  try {
    if (req.body._id) {
      isUpdate = true;
      let productObj = await Product.findByIdAndUpdate(req.body._id, {
        $set: {
          ...req.body,
          modifiedOn:Date.now()
        },
      });
    } else {
      let product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        material: req.body.material,
        cut: req.body.cut,
        stock:req.body.stock
      });
    }

    return res.status(200).json({
      success: true,
      message: `Product ${isUpdate ? "updated" : "added"} successfully`,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let DeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id) {
      let product = await Product.findById(id);
      if (product) {
        let removedProduct = await Product.findByIdAndRemove(id);
        if (removedProduct) {
          return res.status(200).json({
            success: true,
            message: `Product Delete successfully`,
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: `Product not found`,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: `Id not found`,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let GetProducts = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 5;
  const search = String(req.query.search) || "";
  const currentPage = Number(req.query.page) || 1;
  const category =req.query.category || ``;

  try {

    let filter:any = {
      $or: [
          { name:{ $regex: search, $options: "i" } },
          // { price: { $regex: regex } },
          { description: { $regex: search, $options: "i" } },
      ],
    };
  

  if (category) {
    console.log(`inside category`)
    filter.category = { $in: [category]} 
  }
  // console.log(category,typeof category,filter)
  // return res.status(200).json({category,filter})


    let productList = await Product.find(filter)
      .populate("category")
      .sort({ createdOn: -1 })
      .skip((currentPage - 1) * limit)
      .limit(limit);

    //add clg cover img
    if (productList.length > 1) {
      for (let idx = 0; idx < productList.length; idx++) {
        let coverPic = await ProductImage.findOne({
          productId: productList[idx]._id,
          isCover: true,
        });
        if (coverPic) {
          const coverFilePath = `${baseUrl}${FilePaths.productFilePath}/${productList[idx]._id}/${coverPic.image}`;
          productList[idx] = {
            ...productList[idx]._doc,
            coverImage: {
              image: coverFilePath,
              id: coverPic._id,
            },
          };
        } else {
          productList[idx] = {
            ...productList[idx]._doc,
            coverImage: {
              image: null,
            },
          };
        }
      }
    }

    let totalProductCount = await Product.find(filter).countDocuments();
    if (productList) {
      return res.status(200).json({
        success: true,
        totalCount: totalProductCount,
        data: productList,
        currentPage: currentPage,
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let GetProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  let otherImageList: { id: any; image: string; }[]=[];
  try {
    let product = await Product.findById(id).populate('category');
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found`,
      });
    }
    //get product cover 
    let productImages = await ProductImage.find({ productId: id });
    if(productImages.length>0){
       let coverImage=productImages.filter((image:any)=> image.isCover==true)[0];
       let otherImages=productImages.filter((image:any)=> image.isCover==false);

      
       if(otherImages.length>0){
        otherImages.map((image:any)=>{
          otherImageList.push({
            id:image._id,
            image: `${baseUrl}${FilePaths.productFilePath}/${id}/${image.image}`
        })
        })
       
       }

      

       return res.status(200).json({
        success:true,
        data:{
            ...product._doc,
            coverImage:(productImages && coverImage) ? {id:coverImage._id,image:`${baseUrl}${FilePaths.productFilePath}/${id}/${coverImage.image}`} : {image:null},
            otherImages:otherImageList.length>0? otherImageList:[],   
               }
       })
    }
    else{
        return res.status(200).json({
            success:true,
            data:{
                ...product._doc,
                coverImage:{ image:null},
                otherImages:[]
            }
        })
    }
  } catch (err: any) {
    return res.status(500).json({success:false,message:err.message})
  }
};

let AddProductImages=async(req: Request, res: Response)=>{
  const {id}=req.params;
  try {
    const files=req.files as { [fieldname: string]: Express.Multer.File[] }; //mention the type of req.file type 
    let coverImage=(files.coverImage) ? files.coverImage[0]:null;
    let otherImages=files.otherImages;

    let otherImagesExist=await ProductImage.find({productId:id,isCover:false})
    //handle cover image
    if(coverImage){
      let coverImageExist=await ProductImage.findOne({productId:id,isCover:true})
      if(coverImageExist){
        //file with same name
        if(coverImage.originalname===coverImageExist.image){
          const updateImage=await ProductImage.findByIdAndUpdate(
            coverImageExist._id,
            {image:coverImageExist.originalname,modifiedOn: Date.now()},
            {new:true}
          )
        }
        else{
          //if different file name 
          const removeExistingCover=await ProductImage.deleteOne({
            productId:id,
            isCover:true
          })
          //delete file from path
          const filePathToRemove=`${rootDir}${FilePaths.productFilePath}/${id}/${coverImageExist.image}` 
          
          if(fs.existsSync(filePathToRemove)){
            fs.unlinkSync(filePathToRemove);
          }
          //add in db
          const model=await ProductImage.create({
            image:coverImage.originalname,
            productId:id,
            isCover: true,
          })

          
          
        }
      }
      else{
        const model=await ProductImage.create({
          image:coverImage.originalname,
          productId:id,
          isCover: true,
        })
      }
    }

    //handle other images
    if(otherImagesExist.length > 0){
      if(otherImages){
        if(otherImages.length>0){
          otherImages.forEach(async(uploadedFile:any,index:number)=>{
            const fileWithSameName=otherImagesExist.find((ele:any)=>{
                ele.image===uploadedFile.originalname
            })
    
            if(fileWithSameName){
              //update image in db
              const updateFile=await ProductImage.updateOne({_id:fileWithSameName._id},{
                modifiedOn:Date.now()
              })
            }
            else{
              //add image in db
              otherImages.forEach(async(uploadedFile:any,index:number)=>{
                const fileModel=await ProductImage.create({
                  image:uploadedFile.originalname,
                  isCover:false,
                  productId:id,
                })
              })
            }
    
            
          })
         }
      }
    }
    else{
      if(otherImages){
        if(otherImages.length>0){
          //add all files in db
          otherImages.forEach(async(uploadedFile:any,index:number)=>{
            const fileModel=await ProductImage.create({
              image:uploadedFile.originalname,
              isCover:false,
              productId:id
            })
          })
        }
      }
    }

    return res.status(200).json({
      success:true,
      message:`Images added successfully`
    })
  } catch (err:any) {
    return res.status(500).json({success:false,message:err.message})
  }
}

let DeleteProductImage=async (req: Request, res: Response) => {
  const {id}=req.params;
try {
  if(ObjectId.isValid(id)){
    const imageExist=await ProductImage.findById(id)
    if(imageExist){
      const imagePathToDelete=`${rootDir}${FilePaths.productFilePath}/${imageExist.productId}/${imageExist.image}`

      if(fs.existsSync(imagePathToDelete)){
        fs.unlinkSync(imagePathToDelete)
      }

      const deleteImage=await ProductImage.deleteOne({_id:id})
      if (deleteImage.deletedCount === 0) {
        return res.status(500).json({ success:false, message: `Problem in deleting file` });
      }
      return res.status(200).json({ success:true, message: `File deleted successfully` });
    }
    else{
      return res.status(500).json({ success:false, message: `Image not found` });
    }
  }
  else{
    return res.status(500).json({ success:false, message: `Invalid file id` });
  }
  
} catch (err:any) {
  return res.status(500).json({ success:false, message: `${err.stack}` });
}
}

let ProductDropdown=async(req: Request, res: Response)=>{
  try {
    let products=await Product.find({})
    return res.status(200).json({ success:true, data:products})
    
  } catch (err:any) {
    return res.status(500).json({ success:false, message: `${err.stack}` });
  }
}


export {
    AddUpdateProduct,
    DeleteProduct,
    GetProducts,
    GetProductDetails,
    AddProductImages,
    DeleteProductImage,
    ProductDropdown
}