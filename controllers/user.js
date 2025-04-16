let {user} = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret_key = "12secret34"
async function insertUser(req,res){
    console.log("insert user")
    console.log(req.body)
    try{
    const {fname,email,mobile,password}= req.body
    let userExist =await  user.findOne({email:email})
    if(userExist){
        console.log("user already exist")
        return res.status(409).json({message:"user already exist"})
    }
    let hash =await bcrypt.hash(password,10)
    const insert = await user.create({fullName:fname,email:email,mobile:mobile,password:hash})
    console.log(insert)
    }catch(e){
        console.log(e.message)
    }
    return res.status(200).json({message:"user Created Successfully"})
}

async function handleSignin(req,res){
    console.log(req.body)
    const {email,password} = req.body
    try{
        let userData = await user.findOne({email:email})
        if(userData){
            console.log("asdfasd")
     let compare = await   bcrypt.compare(password,userData.password)
     if(compare){
        let token = jwt.sign({userId:userData._id,email:userData.email,fullName:userData.fullName,role:"user"},secret_key,{expiresIn:'1h'})
        // console.log(token)
        return res.status(200).json({message:"login successfully",token:token})
     }else{
        return res.status(401).json({message:"incorrect password"})
     }
    }else{
        console.log("email does not exist")
        return res.status(409).json({message:"email doesn't exist"})
    }
    }catch(e){
        console.log(e)
    }
}

function verifyToken(req,res){
    // console.log(req.headers.authorization.split(" ")[1])
    try{
    let token = req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(404).json({message:"no token"})
    }
    let decoded = jwt.verify(token,secret_key)
    return res.status(200).json({decoded:decoded})
}catch(e){
    console.log(e.message)
}

}





module.exports={insertUser,handleSignin,verifyToken}