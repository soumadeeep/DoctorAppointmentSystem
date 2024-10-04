import { catchAssyncherros } from "../middlewares/catchAsyncherrors.js";
import { Message } from "../Model/MessageSchema.js";
import ErrorHandeler from "../middlewares/errormidleware.js";
export const sendMessage= catchAssyncherros(async(req,res,next)=>{
    const{firstname,lastname,email,phone,message}=req.body;
    if(!firstname||!lastname||!email||!phone||!message){
        return next(new ErrorHandeler("Please fill the full form!",400))
    }
    await Message.create({firstname,lastname,email,phone,message})
    res.status(200).json({
        success:true,
        message:"message send successfully"
    })
})
export const getAllMessage=catchAssyncherros(async(req,res,next)=>{
const message=await Message.find().collation({ locale: 'en', strength: 2 })
res.status(200).json({
    success:true,
    message
})
})