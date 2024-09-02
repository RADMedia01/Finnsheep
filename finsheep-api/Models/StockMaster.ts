
const Joi=require('joi');
const mongoose=require('mongoose');

const StockMasterSchema= new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required: true,},
    variation:{type:mongoose.Schema.Types.ObjectId,ref:'ProductVariation'},
    quantity:{type:Number},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const StockMaster= mongoose.model('StockMaster',StockMasterSchema)