
const Joi=require('joi');
const mongoose=require('mongoose');

const CategorySchema=new mongoose.Schema({
    name:{type:Joi.string()},
    description:{type:Joi.string()},
    picture:{type:Joi.string()},
    parentCategoryId:{type:String},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})


export const Category=mongoose.model('Category',CategorySchema)
