
const Joi=require('joi');
const mongoose=require('mongoose');

const ProductsVariationSchema=new mongoose.Schema({
    size:{type:String},
    price:{type:Number, required:true},
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product', required:true},
    width:{type:Number,required: true,},
    length:{type:Number,required: true,},
    height:{type:Number,required: true,},
    quantity:{type:Number, required:true},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const ProductsVariation= mongoose.model('ProductsVariation',ProductsVariationSchema)