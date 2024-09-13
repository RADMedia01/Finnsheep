import express from 'express';
import { BulkStockUpload } from './../Controllers/StockMasterController';
import { bulkUpload } from './../Config/FileStorageConfig'; 

const stockMasterRouter = express.Router();


stockMasterRouter.post('/bulkUpload', bulkUpload.single('file'), BulkStockUpload);

export default stockMasterRouter;
