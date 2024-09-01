
const Joi=require('joi');
const mongoose=require('mongoose');

const StockMasterSchema= new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required: true,},
    productVariation:[{type:mongoose.Schema.Types.ObjectId,ref:'ProductVariation'}],
    sku:{type:Joi.string(),required: true,},  
    retailPrice:{type:Number,},
    wholesalePrice:{type:Number,},
    tax:{type:Number},
    color:{type:String},
    brand:{type:String},
    inStock:{type:Boolean},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const StockMaster= mongoose.model('StockMaster',StockMasterSchema)