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


let BulkStockUpload = async (req: Request, res: Response) => {
  try {
      const file = req.file as Express.Multer.File; 

      if (!file) {
          return res.status(400).json({
            success: false,
              message: "No file uploaded",
          });
      }

      await BulkUpload(file);

      return res.status(200).json({
          success: true,
          message: "File processed successfully",
      });

  } catch (err: any) {
      res.status(500).json({
        success: false,
          message: err.message,
      });
  }
};

export {
  AddSingleStock,
  BulkStockUpload
}