import { catchAssyncherros } from "../middlewares/catchAsyncherrors.js";
import ErrorHandeler from "../middlewares/errormidleware.js";
import {User} from "../Model/userschima.js"
import{generateJsonToken}from "../utils/jwtToken.js"
import cloudinary from "cloudinary"
export const patientRegister=catchAssyncherros(async(req,res,next)=>{
    const{firstname,lastname,email,phone,nic,dob,gender,password,role}=req.body
    if(!firstname||!lastname||!email||!phone||!password ||!gender ||!dob||!nic ||! role){
        return next(new ErrorHandeler("Please fill the full form!",400))
    }
    let user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
   if(user){
     return next(new ErrorHandeler("This User Already Registered!",400))
    }
    
  user= await User.create({firstname,lastname,email,phone,nic,dob,gender,password,role})
   generateJsonToken(user,"User Register Successfully",200,res)

//    res.status(200).json({
//     success:true,
//     message:"Account Create Successfully."
// })

})
// this is the login section
export const login= catchAssyncherros(async(req,res,next)=>{

const{email,password,confirmPassword,role}=req.body;
if(!email||!password||!confirmPassword||!role){
    return next(new ErrorHandeler("Please provide All details",400));
}
if(password!==confirmPassword){
    return next(new ErrorHandeler("Password and ConfirmPassword don't Match!",400))
}
const user= await User.findOne({email}).select("+password").collation({ locale: 'en', strength: 2 });
if(!user){
    return next(new ErrorHandeler("Please provide a Valid Email or Password",400));
}

const isPasswordMatch=await user.comparePassword(password)

if(!isPasswordMatch){
return next(new ErrorHandeler("Please provide a correct password",400));
}
if(role!=user.role){
    return next(new ErrorHandeler(`You are not an Admin. You ar a ${user.role} `,400)); 
}
generateJsonToken(user,"User Logdin",200,res)

// res.status(200).json({
//     success:true,
//     message:" User Login successfully!" 
// })

})

//add Admin
export const addAdmin= catchAssyncherros(async(req,res,next)=>{
const{firstname,lastname,email,phone,nic,dob,gender,password}=req.body
if(!firstname||!lastname||!email||!phone||!password ||!gender ||!dob||!nic){
    return next(new ErrorHandeler("Please fill the full form!",400))
}
const isRegister = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
if(isRegister){
  return next(new ErrorHandeler("This User Already Registered!",400))
 }
const admin= await User.create({firstname,lastname,email,phone,nic,dob,gender,password,role:"Admin"})
res.status(200).json({
    success:true,
    message:"New admin Registered!"
})
})

//get doctors
export const getDoctors= catchAssyncherros(async(req,res,next)=>{
const doctor=await User.find({role:"Doctor"}).collation({ locale: 'en', strength: 2 });
res.status(200).json({
    success:true,
    doctor
})
})

//get userdetails
export const getUserDetails=catchAssyncherros(async(req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user
    })
})
//adminlogout

export const logoutAdmin=catchAssyncherros(async(req,res,next)=>{
res.status(200).cookie("adminToken"," ",{
    expires:new Date(Date.now()),
    httponly:true
}).json({
    success:true,
    message:"Admin Logout Successfully"
})
})

//Patient Login

export const logoutPatient=catchAssyncherros(async(req,res,next)=>{
    res.status(200).cookie("patientToken"," ",{
        expires:new Date(Date.now()),
        httponly:true
    }).json({
        success:true,
        message:"Patient Logout Successfully"
    })
    })

    /* add new doctor*/

    export const addNewDoctor=catchAssyncherros(async(req,res,next)=>{
    //req.files This refers to the files that are uploaded through the HTTP request.
    if(!req.files||Object.keys(req.files)===0){
        return next(new ErrorHandeler("Doctor Avatar Required!",400))
    }
    const{docAvatar}=req.files
    const allowFormats=["image/png","image/jpeg","image/webp","image/jpg"]
    //his refers to the MIME type of the uploaded file. The MIME type is a string that 
    //represents the type of file (e.g., image/jpeg, image/png, application/pdf).
    if(!allowFormats.includes(docAvatar.mimetype)){
    return next(new ErrorHandeler("File Format Not Suported!",400))
    }
    const{firstname,lastname,email,phone,nic,dob,gender,password,doctorDepartment}=req.body
    if(!firstname||!lastname||!email||!phone||!password ||!gender ||!dob||!nic ||!doctorDepartment){
        return next(new ErrorHandeler("Please Provide Full details !",400))
    }
    let isRegister = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
   if(isRegister){  
     return next(new ErrorHandeler("This Doctor Already Registered!",400))
    }
    const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath)
    if(!cloudinaryResponse||cloudinaryResponse.error){
        console.error("cloudinary error:",cloudinaryResponse.error||"Unknown cloudinary error")
    }
    const doctor = await User.create({firstname,lastname,email,phone,nic,dob,gender,password,doctorDepartment,role:"Doctor",docAvatar:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url,
    }})
    res.status(200).json({
        success:true,
        message:"New Doctor Register",
       doctor
    })
    })