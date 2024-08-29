import { Request,Response,NextFunction } from "express";
import { CreateRazorPayInstance } from "../Config/RazorPayConfig"
import { StockMaster } from "../Models/StockMaster";
const ExcelJS = require('exceljs');


let AddSingleStock=(req: Request, res: Response)=>{
  try {
    
  } catch (err:any) {
    
  }
}

let BulkStockUpload=async(req: Request, res: Response)=>{
    try {
        const file = req.file as Express.Multer.File;

  // Read data from the uploaded Excel file using exceljs
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile(file.path)
    .then(() => {
      const worksheet = workbook.worksheets[0];
      const data = [];

      worksheet.eachRow((row:any, rowNumber:Number) => {
        const rowData: any[] = [];
        row.eachCell((cell:any, cellNumber:Number) => {
          rowData.push(cell.value);
        });
        data.push(rowData);
      });
    })
    
    } catch (err:any) {
        
    }
}