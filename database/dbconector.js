import mongoose from "mongoose"
export const dbconnector=()=>{
    mongoose.connect('mongodb://localhost:27017/hospital-management')
    .then(()=>{
        console.log("database connected")
    })
    .catch((err)=>{
        console.log(`some error ocure ${err}`)
    })

}