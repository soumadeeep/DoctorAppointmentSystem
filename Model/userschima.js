import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userschema= new mongoose.Schema({
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
        validate: [validator.isEmail, "Please provide a valid email"],
        unique:true
    },
    phone:{
        type:String,
        require:true,
       minLength:[10,"please enter valid phone number"],
       maxLengtrh:[10,"please enter valid phone number"],
    },
    nic:{
        type:String,
        require:true,
        minLength:[13,"Nic must contain atlist 13 digits!"],
        maxLengtrh:[13,"Nic must contain atlist 13 digits!"],
    },
    dob:{
        type:Date,
        require:[true,"DOB is required!"]
    },
    gender:{
        type:String,
        require:true,
        enum:["Male","Female"]
    },
    password:{
        type:String,
        require:true,
        minLength:[8,"contain atlist 8 charecter"],
        select:false
    },
    role:{
        type:String,
        require:true,
        enum:["Admin","Patient","Doctor"]
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
       public_id:String,
       url:String
    }

},{collation:'user'})

// when we write userschema.(some method ) this time when we save the document this method also save for each document in
//mongo database.

userschema.pre("save",async function(next) {
    if(!this.isModified("password")){
        next()
    }
   this.password= await bcrypt.hash(this.password,10)
})
userschema.methods.comparePassword= async function(enterPassword) {
    return await bcrypt.compare(enterPassword,this.password)
    
}

userschema.methods.generateJsonwebToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
}

export const User= mongoose.model('user',userschema)
