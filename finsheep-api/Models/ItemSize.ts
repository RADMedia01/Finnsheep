
const Joi=require('joi');
const mongoose=require('mongoose');

const ItemSizeSchema=new mongoose.Schema({
    size:{type:String, required:true},
    price:{type:Number, required:true},
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product', required:true},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const ItemSize= mongoose.model('ItemSize',ItemSizeSchema)