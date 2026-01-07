import jwt from "jsonwebtoken"

const jenerateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:"1h"})
}

// Register User
exports.registerUser= (req,res)=>{

}

// login  User
exports.loginUser= (req,res)=>{

}

// user ingo User
exports.userInfo= (req,res)=>{

}