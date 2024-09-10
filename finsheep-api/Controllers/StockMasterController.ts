import { Request,Response,NextFunction } from "express";
import { BulkUpload } from "../Services/StockService";
import { error } from "console";
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

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
        const file = req.files as Express.Multer.File[];
        console.log(req.files)
        // Read data from the uploaded Excel file using exceljs
        console.log(file);
        if (!file || file.length === 0) {
          return res.status(400).json({
            status: false,
            message: "No file uploaded",
        });
      }
        return res.status(200).json({
          status: true,
          data: file,
        })
        let firstRow = await BulkUpload(file[0])
        
    } catch (err:any) {
        res.status(500).json({
          status: false,
          message: err.message 
        })
    }
}
export {
  AddSingleStock,
  BulkStockUpload
}