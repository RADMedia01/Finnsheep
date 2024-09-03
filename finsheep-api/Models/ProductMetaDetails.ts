const mongoose=require('mongoose'); 

const ProductMetaDetailsSchema=new mongoose.Schema({
    productVariation:{type:mongoose.Schema.Types.ObjectId,ref:'ProductsVariation', required:true},
    metaSize:{type:String},
    metaColor: {type:String},
    metaFabric:{type:String},
    metaGender: {type: String},
    metaLength: {type: Number},
    metaWeight: {type: Number},
    sku: {type: String},
    createdOn:{
        type: Date,
        default: Date.now
    },
    modifiedOn:{ type:Date },
})

export const ProductMetaDetails= mongoose.model('ProductMetaDetails',ProductMetaDetailsSchema)
