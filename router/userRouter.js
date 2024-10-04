import express from "express"
import{addAdmin, addNewDoctor, getDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister}from "../controller/userController.js"
import{isAdminAuthenticated,isPatientAuthenticated} from "../middlewares/auth.js"
const router=express.Router()
//p register
router.post("/patient/register",patientRegister)
//login
router.post("/login",login)
//add admin
router.post("/admin/addnew",isAdminAuthenticated,addAdmin)
//doctors data
router.get("/doctors",getDoctors)
//user details
router.get("/admin/me",isAdminAuthenticated,getUserDetails)
router.get("/patient/me",isPatientAuthenticated,getUserDetails)
//adminlogout
router.get("/admin/logout",isAdminAuthenticated,logoutAdmin)
//patient logout
router.get("/patient/logout",isPatientAuthenticated,logoutPatient)
//register new Doctor
router.post("/doctor/addnew",isAdminAuthenticated,addNewDoctor)
export default router
