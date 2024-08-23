import { Schema } from "mongoose";

const Joi=require('joi');
const mongoose=require('mongoose');


export const ProductItemSchema=new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:`Product`},
    qty:{type:Number,default:1},
    price:{type:Number},
})
  

const CartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    items:[{
        productId:{type:Schema.ObjectId, ref : "product"},
        quantity:{
          type:Number,
          default:1
        },
        price:{type:Number},
    }],    
    totalPrice:{type:Number},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const Cart=mongoose.model('Cart',CartSchema);