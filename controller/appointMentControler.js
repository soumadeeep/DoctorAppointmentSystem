import { catchAssyncherros } from "../middlewares/catchAsyncherrors.js";
import ErrorHandler from "../middlewares/errormidleware.js";
import { Appoinment } from "../Model/appointmentScheema.js";
import { User } from "../Model/userschima.js";
//post Appointment
export const postAppointment = catchAssyncherros(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstname,
    doctor_lastname,
    hasvisited,
    address,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstname ||
    !doctor_lastname ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill The All details", 400));
  }
  const isConflict = await User.find({
    firstname: doctor_firstname,
    lastname: doctor_lastname,
    role: "Doctor",
    doctorDepartment: department,
  }).collation({ locale: 'en', strength: 2 });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor Not Found!", 400));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler("Doctor conflict Please contact email or Phone!", 400)
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment =await Appoinment.create({
    firstname,
    lastname,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstname: doctor_firstname,
      lastname: doctor_lastname,
    },
    hasvisited,
    doctorId,
    patientId,
    address,
  });

  res.status(200).json({
     success:true,
     message:"Appoinement send successfully !!"
  })
});
//get appointment
export const getAllAppointment=catchAssyncherros(async(req,res,next)=>{

    const appointments=await Appoinment.find();
    res.status(200).json({
        success:true,
        appointments
    })

})
//update appoinment section
export const updateAppointmentStattus= catchAssyncherros(async(req,res,next)=>{
const{id}=req.params;
let appoinment= await Appoinment.findById(id)
if(!appoinment){
    return next(new ErrorHandler("Appointment Not found !",400))
}
/*findByIdAndUpdate()=>this function mainly take 4(id-> for find item,req.body-> updatedvalue,options->for 
An object to specify options that modify the behavior of the update operation.,one callbackfunction it not mandetory
if you use async)
*/
//paramitar but here we provide 3 paramitar
appoinment= await Appoinment.findByIdAndUpdate(id,req.body,{
    new:true, // Return the updated document
    runValidators:true, // Run schema validators on the new data
    useFindAndModify:false, // Use modern MongoDB update method
})
res.status(200).json({
    success:true,
    message:"Appoinment Status Updated!!",
    appoinment
})
})

//delete appoinment

export const deleteAppoinment=catchAssyncherros(async(req,res,next)=>{
//{id,date,..anything} this syntax call distracting object means you take the particular value from the object
const{id}=req.params;
let appoinment= await Appoinment.findById(id)
if(!appoinment){
    return next(new ErrorHandler("Appointment Not found !",400))
}
await appoinment.deleteOne();
res.status(200).json({
  success:true,
  message:" Appoinment Delete successfully"
})

})

//get only appoinment status
export const getApplicationStatus=catchAssyncherros(async(req,res,next)=>{
  const patientId=req.user._id;
  const totalAppoinments= await Appoinment.find({patientId:patientId},{firstname:1,lastname:1,status:1,_id:1,appointment_date:1})
  if(!totalAppoinments){
    return next(new ErrorHandler("You have no Appoinment",400));
  }
  res.status(200).json({
    success:true,
    totalAppoinments
  })

})

