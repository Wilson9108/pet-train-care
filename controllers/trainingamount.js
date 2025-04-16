let {trainingAmount} = require("../models/trainingamount")

let {training} =  require("../models/training")

async function handleTrainingAmount(req,res){
    console.log(req.body)
    try{
    const {amount,duration,description,trainingId,adminId} = req.body
    if(!adminId){
        console.log("admin please login")
        return
    }
    let insert = await trainingAmount.create({amount:amount,duration:duration,description:description,trainingId:trainingId,adminId:adminId})
    if(insert){
        let status = await training.findByIdAndUpdate(trainingId,{status:1})
    return res.status(200).json({message:"success"})
    }
}catch(e){
    console.error(e.message)
}}

async function handleAcceptStatusInTrainingAmount(req,res){
    let  {id} = req.params
    console.log("params in trainamount" , id)
    try{
        let status = await trainingAmount.findByIdAndUpdate(id,{status:1})
        console.log("status",status)

        return res.status(200).json({message:"status updated successfully"})

    }catch(e){
        console.log(e.message)
    }
}

async function handleRejectStatusInTrainingAmount(req,res){
    try{
    let {id} = req.params
    let status = await trainingAmount.findByIdAndUpdate(id,{status:-1})
    return res.status(200).json({message:"status updated successfully"})

    }catch(e){
        console.error(e.message)
    }
}







module.exports={handleTrainingAmount,handleAcceptStatusInTrainingAmount,handleRejectStatusInTrainingAmount}

