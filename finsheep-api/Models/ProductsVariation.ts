
const Joi=require('joi');
const mongoose=require('mongoose');

const ProductsVariationSchema=new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product', required:true},
    description:{type:String},
    size:{type:String},
    retailPrice:{type:Number, required:true},
    wholesalePrice:{type:Number},
    width:{type:Number,required: true,},
    length:{type:Number,required: true,},
    height:{type:Number,required: true,},
    taxPercentage:{type:Number,default: 0},
    shippingCharges: {type:Number, default:0},
    quantity:{type:Number, required:true},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const ProductsVariation= mongoose.model('ProductsVariation',ProductsVariationSchema)