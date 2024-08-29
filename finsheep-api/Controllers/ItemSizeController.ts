import { ProductsVariation } from './../Models/ProductsVariation';

import { Request,Response,NextFunction } from "express";


let AddUpdateItemSize=async(req:Request, res:Response)=>{
    let isUpdate:boolean = false
    try {
        if(req.body._id){
            isUpdate=true;
            //update
            let sizeObj=await ProductsVariation.findByIdAndUpdate(req.body._id,
                { $set: {
                    ...req.body,
                    modifiedOn:Date.now()
                } }
            );
        }
        else{
            //add 
            let model=await ProductsVariation.create({
                size:req.body.size,
                price:req.body.price,
                product:req.body.product,
            })
        }

        return res.status(200).json({
            success:true,
            message:`Size ${isUpdate ? "updated":"added"} successfully`
        })
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let ItemSizeList=async(req:Request, res:Response)=>{
    try {
        let sizes=await ProductsVariation.find({}).populate('product')
        if(!sizes){
            return res.status(404).json({
                success:false,
                message:`No sizes`
            })
        }

        return res.status(200).json({
            success:true,
            data:sizes
        })


        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let DeleteItemSize=async(req:Request, res:Response)=>{
    const {id}=req.params
    try {
        if(id){
            let size=await ProductsVariation.findById(id)
            if(size){
                let removedSize=await ProductsVariation.deleteOne({_id:id});
                if(removedSize){
                    return res.status(200).json({
                        success:true,
                        message:`Size Delete successfully`
                    })
                }

            }
            else{
                return res.status(404).json({
                    success:false,
                    message:`Category not found`
                })
            }

        }
        else{
            return res.status(400).json({
                success:false,
                message:`Id not found`
            })
        }
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let ItemSizeDetails=async(req:Request, res:Response)=>{
    const {id}=req.params
    try {
        if(id){
            let category=await ProductsVariation.findById(id)
            if(category){
                return res.status(200).json({
                    success:true,
                    data:category
                })
            }
            else{
                return res.status(404).json({
                    success:false,
                    message:`Category not found`
                })
            }
        }
        else{
            return res.status(500).json({
                success:false,
                message:`Provide Id`
            })
        }
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


export {
    AddUpdateItemSize,
    ItemSizeList,
    DeleteItemSize,
    ItemSizeDetails
}