import { Request,Response,NextFunction } from "express"
import { Users } from "../Models/Users";
import { EncodeBase64,DecodeBase64, UserRole } from "../Common/Common";

let CreateEditUser=async (req: Request, res: Response)=>{
    let isUpdate:boolean = false
    try {
        
        if(req.body._id){
            isUpdate=true;
            //update
            let userObj=await Users.findByIdAndUpdate(req.body._id,
                { $set: req.body }
            );
        }
        else{
            //add
            let hashedPassword=EncodeBase64(req.body.password)
            let user=await Users.create({
                name:req.body.name,
                password:hashedPassword,
                mobile:req.body.mobile,
                email:req.body.email,
                picture:req.body.picture,
                address:req.body.address,
                role:req.body.role,
            })
        }

        return res.status(200).json({
            success:false,
            message:`User ${isUpdate ? "updated":"added"} successfully`
        })
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let DeleteUser=async(req:Request, res:Response)=>{
    const {id}=req.params
    try {
        if(id){
            let user=await Users.findById(id)
            if(user){

                let removedUser=await Users.deleteOne({_id:id});
                if(removedUser){
                    return res.status(200).json({
                        success:true,
                        message:`User Delete successfully`
                    })
                }

            }
            else{
                return res.status(404).json({
                    success:false,
                    message:`User not found`
                })
            }

        }
        else{
            return res.status(400).json({
                success:false,
                message:`Id not found`
            })
        }
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let Login=async(req:Request, res:Response)=>{
    try {
        if(!req.body.email || !req.body.password){
            return res.status(400).json({
                success:false,
                message:"Please enter email and password"
            })
        }

        let hashedPassword=EncodeBase64(req.body.password);
        let user=await Users.findOne({email:req.body.email,role:UserRole.Client})
        if(user){
            if(user.password==hashedPassword){
                return res.status(200).json({
                    success:true,
                    data:user
                })
            }
            else{
                return res.status(400).json({
                    success:false,
                    message:"Invalid Credentials"
                })
            }
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let AdminLogin=async(req:Request, res:Response)=>{
    try {
        if(!req.body.email || !req.body.password){
            return res.status(400).json({
                success:false,
                message:"Please enter email and password"
            })
        }

        let hashedPassword=EncodeBase64(req.body.password);
        let user=await Users.findOne({email:req.body.email,role:UserRole.Admin})
        if(user){
            if(user.password==hashedPassword){
                return res.status(200).json({
                    success:true,
                    data:user
                })
            }
            else{
                return res.status(400).json({
                    success:false,
                    message:"Invalid Credentials"
                })
            }
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        
    } catch (err:any) {
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

let UserDetails=async(req:Request, res:Response)=>{
    const {id}=req.params
    try {
        if(id){
            let user=await Users.findById(id)
            if(user){
                return res.status(200).json({
                    success:true,
                    data:user
                })
            }
            else{
                return res.status(404).json({
                    success:false,
                    message:`User not found`
                })
            }
        }
        else{
            return res.status(500).json({
                success:false,
                message:`Provide Id`
            })
        }
    } catch (err:any) {
        
    }
}

let UserList=async(req:Request, res:Response)=>{
    const limit = Number(req.query.limit) || 5;
    const search = String(req.query.search) || "";
    const currentPage = Number(req.query.page) || 1;
    try {
        let users=await Users.find({ name: { $regex: search, $options: "i" }})
        .sort({ createdOn: -1 })
        .skip((currentPage - 1) * limit)
        .limit(limit);

        if(!users) return res.status(400).json({success:false,data:[]})
         let totalCount=await Users.find({}).countDocuments()   

        res.status(200).json({
            success: true,
            totalCount: totalCount,
            data: users,
            currentPage: currentPage,
        })   
        
    } catch (err:any) {
        res.status(500).json({success:false,message:err.message})
    }
}


export {
    CreateEditUser,
    DeleteUser,
    Login,
    UserDetails,
    AdminLogin,
    UserList
}