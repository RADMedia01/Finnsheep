
const Joi=require('joi');
const mongoose=require('mongoose');
import { Schema } from "mongoose";
import { OrderStatus, PaymentStatus } from "../Common/Common";
import { ProductItemSchema } from "./Cart";
import { AddressSchema } from "./Users";



const OrderSchema=new mongoose.Schema({
    id:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    items:[{        
            productId:{type:Schema.ObjectId, ref : "product"},
            quantity:{
              type:Number,
              default:1
            },
            price:Number,        
    }],
    deliveryCharges:{type:Number},
    subTotal:{type:Number},
    total:{type:Number},
    shippingAddress:AddressSchema,
    paymentMethod:{type:Joi.string()},
    paymentStatus:{type:Joi.string(),default:PaymentStatus.Pending},
    status:{type:Joi.string(),default:OrderStatus.Processing},
    currency:{type:Joi.string(),default:"USD"},
    isPaid:{
        type:Boolean,
        default:false
    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    deliveredAt:Date,
    createdOn:{
        type: Date,
        default: Date.now
    },
})

export const Order=mongoose.model('Order',OrderSchema);