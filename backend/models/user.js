import mongoose from "mongoose";

const usermodel = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true,
        sparse: true
    },
    pw: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'recruiter']
    },
    collegeemail: {
        type: String,
        unique: true,
        sparse: true, 
      },
    profile: {
        bio: { type: String },
        skills: { type: [String] },  
        resume: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto:{
            type:String,
            default:""
        }
    }
}, { timestamps: true });

const User = mongoose.model("User", usermodel);
export default User;
