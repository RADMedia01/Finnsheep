import fs from 'fs';
import multer from "multer";
import { FilePaths } from '../Common/Common';
import path from 'path';
import sharp from 'sharp';

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
    filename: async function (req, file, cb) {
      const productId = req.params.id;
      const rootDir = process.cwd() //root directory
      const uploadPath=`${rootDir}${FilePaths.productFilePath}/${productId}/`
      const filename = `${file.originalname}`; //file saved with name
      const thumbnailFilename = `thumbnail_${filename}`; //thumbnail filename/file saved with name
      
      try {
      //generate and save thumbnail 
      const thumbnailPath =path.join(uploadPath,thumbnailFilename)
      await sharp(file.buffer).resize(200, 200).toFile(thumbnailPath)
      cb(null, filename);
      } catch (error:any) {
          console.log(`Thumbnail error => ${error}`)
      }
    }
});
export const uploadProductImage = multer({ storage: productImageStorage });

export const bulkUpload = multer({ storage: multer.memoryStorage() });