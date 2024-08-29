import { string } from "joi";
import { PaymentStatus } from "../Common/Common";

const Joi=require('joi');
const mongoose=require('mongoose');

const PaymentSchema=new mongoose.Schema({
    id:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    orderId:{type:String},
    paymentMethod:{type:Joi.string()},
    paymentStatus:{type:Joi.string(),default:PaymentStatus.Processing},
    amount:{type:Number},
    card:{
        type:{
            name:String,
            number:String,
            expiry:String,
            cvv:String
        }
    },
    upi:{type:String},
    createdOn:{
        type: Date,
        default: Date.now
    },
})

export const Payment= mongoose.model('Payment',PaymentSchema);