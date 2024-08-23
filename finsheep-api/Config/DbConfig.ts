//import * as dotenv from 'dotenv';
const {  mongoose } = require('mongoose');

require('dotenv').config();

export const DbConnect=async()=>{     
   await mongoose.connect(`mongodb+srv://rionuevo:rionuevo@cluster0.qbykbfy.mongodb.net/finsheep?retryWrites=true&w=majority`)
   .then((res:Response)=>{
     console.log(`Connected to DB`);
   })
   .catch((err:any)=>console.error(`Db error ${err}`));
}

export default DbConnect;


