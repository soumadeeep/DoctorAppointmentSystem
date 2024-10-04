import express from "express"
import{isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"
import { deleteAppoinment, getAllAppointment, getApplicationStatus, postAppointment, updateAppointmentStattus } from "../controller/appointMentControler.js";
 const router= express.Router();
 //post appointment
 router.post("/send",isPatientAuthenticated,postAppointment)
 //get appointment
 router.get("/get",isAdminAuthenticated,getAllAppointment)
 //update status
 //The ":id" is a route parameter (a placeholder) for a dynamic value.this is the params and it part ofthe url
 router.put("/update/:id",isAdminAuthenticated,updateAppointmentStattus)
 //delete
 router.delete("/delete/:id",isAdminAuthenticated,deleteAppoinment)
 //get appoinment status for patient
 router.get("/getstatus",isPatientAuthenticated,getApplicationStatus)
 export default router;