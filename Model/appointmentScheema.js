import mongoose from "mongoose";
import validator from "validator";
const appointmentschema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
    minLength: [3, "min three need"],
  },
  lastname: {
    type: String,
    require: true,
    minLength: [3, "min three need"],
  },
  email: {
    type: String,
    require: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    require: true,
    minLength: [10, "please enter valid phone number"],
    maxLengtrh: [10, "please enter valid phone number"],
  },
  nic: {
    type: String,
    require: true,
    minLength: [13, "Nic must contain atlist 13 digits!"],
    maxLengtrh: [13, "Nic must contain atlist 13 digits!"],
  },
  dob: {
    type: Date,
    require: [true, "DOB is required!"],
  },
  gender: {
    type: String,
    require: true,
    enum: ["Male", "Female"],
  },
  appointment_date: {
    type: String,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  doctor:{
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
  },
  hasvisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});
export const Appoinment = mongoose.model("Appoinment", appointmentschema);
