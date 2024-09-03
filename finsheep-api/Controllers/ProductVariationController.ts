import { Request, Response, NextFunction } from "express";
import { ProductsVariation } from "../Models/ProductsVariation";
import { StockMaster } from "../Models/StockMaster";


let DeleteProductVariation=async(req: Request, res: Response)=>{
    const {id}=req.params
    try {
        if(id){
            let deleteStockAndProductSize=await Promise.all([
                await ProductsVariation.deleteOne({_id:id}),
                await StockMaster.deleteOne({variation:id})
            ])
            

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