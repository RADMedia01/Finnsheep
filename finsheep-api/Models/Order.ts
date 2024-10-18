
const Joi=require('joi');
const mongoose=require('mongoose');
import { Schema } from "mongoose";
import { OrderStatus, PaymentStatus } from "../Common/Common";
import { ProductItemSchema } from "./Cart";
import { AddressSchema } from "./Users";



const OrderSchema=new mongoose.Schema({
    id: { type: String },
    _id: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        productVariationId: { type: Schema.Types.ObjectId, ref: 'ProductVariation' },
        quantity: { type: Number, default: 1, min: 1 }
        }
    ],
    deliveryCharges: { type: Number, default: 0 },
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
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