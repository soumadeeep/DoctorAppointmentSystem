import { User } from "../Model/userschima.js";
import { catchAssyncherros } from "./catchAsyncherrors.js";
import ErrorHandeler from "./errormidleware.js";
import jwt from "jsonwebtoken"
export const isAdminAuthenticated=catchAssyncherros(async(req,res,next)=>{
// server take cookis from the client (browser or postman) that genaret after the login  
// first when i logedin this time my cookies store in my browser but it not accessable by
// client side kno when i heat any api this time my req object take this cookies and give it to server
// and server decode it and take the data from cookies.
// if i have cookies in browser this time every reqest browser by default send this cookies    
const token=req.cookies.adminToken;
if(!token){
    return next(new ErrorHandeler("Admin not Authenticated",400));
}
//Format: Encoded JSON object with three parts: Header, Payload, and Signature.
const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
req.user= await User.findById(decoded.id).collation({ locale: 'en', strength: 2 });
if( req.user.role!=="Admin"){
    return next(new ErrorHandeler(`${req.user.role} Not Authorize for this resources`,400))
}
next()
})

export const isPatientAuthenticated=catchAssyncherros(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandeler("Patient not Authenticated",400));
    }
    //Format: Encoded JSON object with three parts: Header, Payload, and Signature.
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    // after verification we gate the data from jwt and atach this data in rewuest section that we use this data 
    //farther processing 
    req.user= await User.findById(decoded.id).collation({ locale: 'en', strength: 2 });
    if(req.user.role!=="Patient"){
        return next(new ErrorHandeler(`${req.user.role} Not Authorize for this resources`,400))
    }
    next()
    })

//Authentication is the process of verifying 
//the identity of a user or system. It answers the question: "Who are you?"

//Authorization is the process of determining whether an authenticated user has permission to access a specific resource
// or perform a particular action. It answers the question: "What can you do?"
