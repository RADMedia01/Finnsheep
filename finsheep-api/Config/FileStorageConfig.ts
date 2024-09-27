import fs from 'fs';
import multer from "multer";
import { FilePaths } from '../Common/Common';
import path from 'path';
import sharp from 'sharp';

//product image file config
const productImageStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
      try {
        const productId = req.params.id;
        const rootDir = process.cwd() //root directory
        const uploadPath=`${rootDir}${FilePaths.productFilePath}/${productId}/`
        const thumbnailFilename = `thumbnail_${file.originalname}`; //thumbnail filename/file saved with name

        fs.mkdirSync(uploadPath,{recursive:true}) //create path
        const thumbnailPath =path.join(uploadPath,thumbnailFilename)
        //await sharp(file.buffer).resize(200, 200).toFile(thumbnailPath)
        cb(null, uploadPath); //upload file in path
      } catch (err:any) {
        console.log(`middleware error => `+err.stack)
      }
    },
    filename: async function (req, file, cb) {
      const filename = `${file.originalname}`; //file saved with name
      try {
      cb(null, filename);
      } catch (error:any) {
          console.log(`Thumbnail error => ${error}`)
      }
    },
    
});
export const uploadProductImage = multer({ storage: productImageStorage });

export const bulkUpload = multer({ storage: multer.memoryStorage() });