import { Request, Response, NextFunction } from "express";
import { Product } from "../Models/Product";
import { ProductImage } from "../Models/ProductImage";
import { baseUrl, FilePaths, rootDir } from "../Common/Common";
import fs from 'fs';
import { ParsedQs } from 'qs';
import  {ObjectId}  from 'mongodb';
import mongoose from "mongoose";
import { string } from "joi";
import { ProductsVariation } from "../Models/ProductsVariation";
import { AddSingleProductToStock } from "../Services/StockService";
import APIFeatures from "../utils/ApiFeatures";




let AddUpdateProduct = async (req: Request, res: Response) => {
  let isUpdate: boolean = false;
  let {variations}=req.body
  try {
    if (req.body._id) {
      isUpdate = true;

      let productObj = await Product.findByIdAndUpdate(req.body._id, {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          material: req.body.material,
          cut: req.body.cut,
          stock:req.body.stock,
          modifiedOn:Date.now()
        },
      });

      if(variations){
        if(variations.length>0){
          variations.forEach((element:any) => element.product=req.body._id);          
          let addSizes=await ProductsVariation.create(variations)
          AddSingleProductToStock(addSizes);
        }
      }



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
      if(variations){
        if(variations.length>0){
          console.log('Biii');
          variations.forEach((element:any) => element.product=product._id);
          console.log(variations)
          let addSizes=await ProductsVariation.create(variations)
          AddSingleProductToStock(addSizes);
        }
      }
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
        let removedProduct = await Product.deleteOne({_id:id});
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
  // const search = req.query.search ? String(req.query.search) : "";
  // const currentPage = Number(req.query.page) || 1;
  // const category = req.query.category || '';
  const search = String(req.query.search) || "";
  const currentPage = Number(req.query.page) || 1;
  const category =req.query.category || ``;

  try {
    // Define initial filter
    let filter: any = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ],
    };

    // Add category filter if present
    if (category) {
      filter.category = { $in: [category] };
    }

    // Initialize APIFeatures with query and req.query
    // const features = new APIFeatures(Product.find(filter), req.query as ParsedQs)
    //   .filter()
    //   .sort()
    //   .paginate()
    //   .limitFields();  // Add fields limiting if needed

    // Fetch the products
    //let productList = await features.getQuery().populate("category");
    // Limit fields in the populate as well
    let productList = await Product.find(filter)
      .populate("category")
      .sort({ createdOn: -1 })
      .skip((currentPage - 1) * limit)
      .limit(limit);
    //let productList = await features.getQuery()
    //  .populate({
    //    path: 'category',
    //    select: 'name'  // Limit category fields to name only
    // });

    // Add cover image logic
    if (productList.length > 1) {
      for (let idx = 0; idx < productList.length; idx++) {
        let coverPic = await ProductImage.findOne({
          productId: productList[idx]._id,
          isCover: true,
        });
        if (coverPic) {
          const coverFilePath = `${baseUrl}${FilePaths.productFilePath}/${productList[idx]._id}/thumbnail_${coverPic.image}`;
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

    // Get total count for pagination info
    //let totalProductCount = await Product.find(filter).countDocuments();
    // const filteredQuery = new APIFeatures(Product.find(filter), req.query as ParsedQs)
    //   .filter(); 

    // let totalProductCount = await filteredQuery.getQuery().countDocuments();


    // Return response
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
    let product = await Product.findById(id).populate('category').populate('reviews');
    console.log(product);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found`,
      });
    }
    //get product cover 
    let productImages = await ProductImage.find({ productId: id });
    let variations=await ProductsVariation.find({product:id})
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
            variationList:(variations.length>0) ? variations:[],
            reviews: product.reviews
            }
       })
    }
    else{
        return res.status(200).json({
            success:true,
            data:{
                ...product._doc,
                coverImage:{ image:null},
                otherImages:[],
                reviews: product.reviews,
                variationList:(variations.length>0) ? variations:[]
            },
           
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
          await ProductImage.deleteOne({
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

    if (otherImages) {
      if (otherImages.length > 0) {
        const promises = otherImages.map(async (uploadedFile: any) => {
          const fileWithSameName = otherImagesExist.find(
            (ele: any) => ele.image === uploadedFile.originalname
          );

          if (fileWithSameName) {
            // Update existing image in db
            await ProductImage.updateOne(
              { _id: fileWithSameName._id },
              { modifiedOn: Date.now() }
            );
          } else {
            // Add new image in db
            await ProductImage.create({
              image: uploadedFile.originalname,
              isCover: false,
              productId: id,
            });
          }
        });

        await Promise.all(promises);
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