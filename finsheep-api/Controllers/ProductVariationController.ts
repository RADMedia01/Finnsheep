import { Request, Response, NextFunction } from "express";
import { ProductsVariation } from "../Models/ProductsVariation";


let DeleteProductVariation=async(req: Request, res: Response)=>{
    const {id}=req.params
    try {
        if(id){
            let deleteProductSize=await ProductsVariation.deleteOne({_id:id})
            return res.status(200).json({
                success:true,
                message:`Size deleted`
            })
        }

        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export {
    DeleteProductVariation 
}