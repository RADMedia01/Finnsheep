
const Joi=require('joi');
const mongoose=require('mongoose');

import  Review  from './Review';

const ProductSchema= new mongoose.Schema({
    name:{type:Joi.string(),required: true,},
    description:{type:Joi.string(),required: true,},
    price:{type:Joi.number(),default:0,required: true,},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required: true,},
    stock:{type:Number,required: true},
    material:{type:Joi.string(),required: true,},
    isTrending:{type:Boolean,default:false},
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
    },
      ratingsQuantity: {
        type: Number,
        default: 0
    },
    cut:{type:Joi.string(),},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })

ProductSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
  });

export const Product= mongoose.model('Product',ProductSchema)