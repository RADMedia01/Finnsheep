import { Request,Response,NextFunction } from "express";
import { BulkUpload } from "../Services/StockService";


let AddSingleStock=(req: Request, res: Response)=>{
  try {
    //add product

    //add sizes

    //add product stock
  } catch (err:any) {
    
  }
}

let BulkStockUpload=async(req: Request, res: Response)=>{
    try {
        const file = req.file as Express.Multer.File;
        // Read data from the uploaded Excel file using exceljs
        await BulkUpload(file)
    
    } catch (err:any) {
        
    }
}
export {
  AddSingleStock,
  BulkStockUpload
}