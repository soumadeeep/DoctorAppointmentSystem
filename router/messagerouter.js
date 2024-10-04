import express from "express"
import { getAllMessage, sendMessage } from "../controller/messagecontroller.js"
import { isAdminAuthenticated } from "../middlewares/auth.js"
const router =express.Router()
router.post('/send',sendMessage)
router.get("/getallmessage",isAdminAuthenticated,getAllMessage)
export default router