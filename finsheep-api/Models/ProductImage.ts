
const Joi=require('joi');
const mongoose=require('mongoose');

const ProductImageSchema=new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    image:{type:String},
    isCover:{type:Boolean,default:false},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const ProductImage= mongoose.model('ProductImage',ProductImageSchema)