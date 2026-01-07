import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true
  },
  profileImageUrl :{
    type: String,
    default: null
  } 
},{timestamps: true});

// hash password
UserSchema.pre("save", async (next)=>{
    if(!this.modified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)  
next()  
})

// compare password
UserSchema.method.comparePassword = async (condidatePassword)=>{
   return await bcrypt.compare(condidatePassword,this.password)
}

const User = mongoose.model("User",UserSchema)
export default User;