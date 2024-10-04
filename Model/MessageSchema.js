import mongoose from "mongoose"
import validator from "validator"

const messageschema= new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
        minLength:[3,"min three need"]
    },
    lastname:{
        type:String,
        require:true,
        minLength:[3,"min three need"]
    },
    email:{
        type:String,
        require:true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone:{
        type:String,
        require:true,
       minLength:[10,"please enter valid phone number"],
       maxLengtrh:[10,"please enter valid phone number"],
    },
    message:{
        type:String,
        require:true,
        minLength:[10,"min 10 need"]
    },

},{collation:'hospital'})
export const Message=mongoose.model('hospital',messageschema)