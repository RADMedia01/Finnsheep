import fs from 'fs';
import multer from "multer";
import { FilePaths } from '../Common/Common';
import path from 'path';

//product image file config
const productImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        const productId = req.params.id;
        const rootDir = process.cwd() //root directory
        const uploadPath=`${rootDir}${FilePaths.productFilePath}/${productId}/`
        fs.mkdirSync(uploadPath,{recursive:true}) //create path
        cb(null, uploadPath); //upload file in path
      } catch (err:any) {
        console.log(`middleware error => `+err.stack)
      }
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const filename = `${file.originalname}`; //file saved with name
      cb(null, filename);
    }
});
export const uploadProductImage = multer({ storage: productImageStorage });

export const bulkUpload = multer({ storage: multer.memoryStorage() });