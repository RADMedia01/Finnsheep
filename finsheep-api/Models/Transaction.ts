import { TransactionStatus } from "../Common/Common";

const Joi=require('joi');
const mongoose=require('mongoose');

const TransactionSchema=new mongoose.Schema({
    orderId:{type:mongoose.Schema.Types.ObjectId,ref:'Order'},
    paymentId:{type:mongoose.Schema.Types.ObjectId,ref:'Payment'},
    amount:{type:Number},
    status:{type:Joi.string(),default:TransactionStatus.Initiated},
    gatewayResponse:{type:Joi.string()},
    gatewayResponseCode:{type:Joi.string()},
    createdOn:{
        type: Date,
        default: Date.now
    },
})

export const Transaction=mongoose.model('Transaction',TransactionSchema)