const {admin} = require("../models/admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret_key = "12secret34"
async function insertAdmin(req,res){
    try{
    let {email,password} = req.body
    let userExist = await admin.findOne({adminEmail:email})
    if(userExist){
        console.log("user alrady exist")
        return res.status(409).json({message:"Email  Already Exist"})
    }
    let hash = await bcrypt.hash(password,10)
    if(hash){
    let insert = await admin.create({adminEmail:email,password:hash})
    console.log(insert)
    return res.status(200).json({message:"admin created successfully"})
    }
}catch(e){
    console.log(e.message)
}
}
async function handleSignin(req,res){
    console.log(req.body)
    try{
    const {email,password} = req.body
    let adminData = await admin.findOne({adminEmail:email})
    if(!adminData){
        return res.status(409).json({message:"email does not exist"})
    }
    if(adminData){
        let compare = await bcrypt.compare(password,adminData.password)
            if(compare){
                let admintoken = jwt.sign({adminId:adminData._id,role:"admin"},secret_key,{expiresIn:'1h'})
                // console.log(admintoken)
                return res.status(200).json({message:"signin successfully",admintoken:admintoken})
            }else{
                return res.status(201).json({message:"incorrect password"})
            }
        
    }
    }catch(e){
        console.log(e.message)
    }
}


module.exports={insertAdmin,handleSignin}