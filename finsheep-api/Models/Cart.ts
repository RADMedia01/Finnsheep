import { Schema } from "mongoose";

const Joi=require('joi');
const mongoose=require('mongoose');


export const ProductItemSchema=new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:`Product`},
    qty:{type:Number,default:1},
})
  

const CartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    items:[{
        productId:{type:Schema.ObjectId, ref : "product"},
        productVariationId: {type:mongoose.Schema.Types.ObjectId,ref:'ProductVariation'},
        quantity:{
          type:Number,
          default:1
        },
    }],    
    totalPrice:{type:Number},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const Cart=mongoose.model('Cart',CartSchema);