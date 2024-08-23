
const Joi=require('joi');
const mongoose=require('mongoose');

const BlogSchema=new mongoose.Schema({
    title:{type:Joi.string(),required:true},
    body:{type:Joi.string(),html: true,required:true},
    author:{type:Joi.string(),required:true},
    thumbNail:{type:Joi.string()},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})


export const Blogs=mongoose.model('Blogs',BlogSchema)
