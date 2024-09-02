import express from "express";
const productRouter=express.Router();
import { uploadProductImage } from "../Config/FileStorageConfig";


import {  AddUpdateProduct,
    DeleteProduct,
    GetProducts,
    GetProductDetails,
    AddProductImages,
    DeleteProductImage,
    GetProduct,
    ProductDropdown } from "../Controllers/ProductController";
    
productRouter.put('/upsert',AddUpdateProduct)   
productRouter.get('/:id',GetProductDetails).delete('/:id',DeleteProduct)
productRouter.get('',GetProducts)
productRouter.post('/image/:id',uploadProductImage.fields([{name:`coverImage`,maxCount:1},{name:`otherImages`,maxCount:10}]),AddProductImages)
productRouter.delete('/image/:id',DeleteProductImage)
productRouter.get('/dropdown/list',ProductDropdown)
//productRouter.get('/:id', GetProduct)


export default productRouter



