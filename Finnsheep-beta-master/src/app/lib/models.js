import  mongoose  from 'mongoose';

// <--- User Model Start --->

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:false,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    resetPasswordToken: String,
  resetPasswordExpire: Date,
},
{ timestamps: true });



// <--- User Model End --->


// <--- Portfolio Model Start --->


const portfolioSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    projectUrl:{
        type:String,
    },
    thumbnail:{
        type:String,
    },
    imageUrls:[String],
    technologiesUsed: [String],
    clientName: String, 
},
{ timestamps: true });

// <--- Portfolio Model End --->


// <--- Message Model Start --->

const messageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
    },
    contactNo:{
        type: Number,
    },
    isOpened: {
        type: Boolean,
        default: false // Default value for isOpened field
    },
    isImportant: {
        type: Boolean,
        default: false // Default value for isImportant field
      }
},
{ timestamps: true });

// <--- Message Model End --->



// <--- Tutor Model Start --->


const tutorSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
   state:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    // contactNo:{
    //     type:[String],
    //     required:true,
    //     validate: {
    //         validator: function(v) {
    //             return v && v.length > 0; // Ensure at least one contact number
    //         },
    //         message: 'At least one contact number is required'
    //     } 
    // },
    contactNo:{
        type:String,
        required:true,
    },
    qualification: [{
        type: String,
        required: [true, 'At least one qualification is required'],
        validate: {
            validator: function(v) {
                return v && v.length > 0; // Ensure at least one qualification
            }
        } 
    }],
    subjects: [{
        subject: { type: String, required: true },
        fromClass: { type: String, required: true },
        toClass: { type: String, required: true },
    }],
    fromClass:{
        type:String,
        required:true,
    },
    toClass:{
        type:String,
        required:true,
    },
    boards: [{ type: String,
        required: [true, 'At least one board is required'],
        validate: {
            validator: function(v) {
                return v && v.length > 0; // Ensure at least one qualification
           }
        }
    }],
    yearsOfExperience: { type: Number, default: 0 },
    dob:  { type: String, required: true },
    tutorType: { type: String, enum: ['Private Tutor', 'Coaching Institute', 'Online Tutor'], required: true },
    termsAndConditions: {
        type: Boolean,
        required: true // or false, depending on whether it's required
      },
    subscriptionStatus:{
        type:Boolean,
        default:true,
    },
    lastPaymentDate:{
        type:Date,
    },
},
{ timestamps: true });

// <--- Tutor Model End --->



// <--- Enquiry Model Start --->

const enquirySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    tutorType:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default: "Pending" 
    },
    contactNo:{
        type: Number,
    },
    isImportant: {
        type: Boolean,
        default: false // Default value for isImportant field
      }
},
{ timestamps: true });

// <--- Enquiry Model End --->




// <--- Product Model Start --->
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter Product Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    category:{
        // type:String,
        // required: [true, "Please Enter Product Category"],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
      },
      weight:{
        type:Number,
        required:[true,"Please enter Product Weight"],
        maxLength:[8,"Weight cannot exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0,
      },
      thumbnail:{
        type:String,
    },
    images:[String],

    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    // createdAt:{
    //     type:Date,
    //     default:Date.now
    // }    
},
{timestamps: true})

// <--- Product Model End --->



// <--- Category Model Start --->
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description:{
        type:String,
        required:[false,]
    },
      thumbnail:{
        type:String,
    },

},
{timestamps: true})

// <--- Category Model End --->




export const User = mongoose.models.User || mongoose.model("User", userSchema)

export const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema)

export const Message = mongoose.models.Message || mongoose.model("Message", messageSchema)

export const Tutor = mongoose.models.Tutor || mongoose.model("Tutor", tutorSchema)

export const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema)

export const Product = mongoose.models.Product ||  mongoose.model("Product",productSchema)

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);