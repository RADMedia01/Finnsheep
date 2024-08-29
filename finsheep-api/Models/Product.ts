
const Joi=require('joi');
const mongoose=require('mongoose');

const ProductSchema= new mongoose.Schema({
    name:{type:Joi.string(),required: true,},
    description:{type:Joi.string(),required: true,},
    price:{type:Joi.number(),default:0,required: true,},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required: true,},
    stock:{type:Number,required: true},
    material:{type:Joi.string(),required: true,},
    isTrending:{type:Boolean,default:false},
    cut:{type:Joi.string(),},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const Product= mongoose.model('Product',ProductSchema)