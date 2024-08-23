import express from 'express';
const itemSizeRouter=express.Router();
import {   AddUpdateItemSize,
    ItemSizeList,
    DeleteItemSize,
    ItemSizeDetails} from '../Controllers/ItemSizeController';


itemSizeRouter.put(`/upsert`,AddUpdateItemSize)
itemSizeRouter.get('/:id',ItemSizeDetails).delete('/:id',DeleteItemSize)
itemSizeRouter.get('',ItemSizeList)
//itemSizeRouter.get('/dropdown',CategoryDropdown)


export default itemSizeRouter
