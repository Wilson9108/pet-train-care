const {petdayscareamount} = require('../models/petdayscareamount')
const {petdayscare} =  require('../models/petdayscare')
async function handlePetDaysCareAmount(req,res){
    console.log(req.body)
    const {amount,description,adminId,petDaysCareId}=req.body

    if(!adminId,!petDaysCareId){
        console.log(adminId)
        console.log(petDaysCareId)
        return
    }

    let insert = await petdayscareamount.create({petAmount:amount,petDescription:description,adminId,petDaysCareId})
    // console.log(insert)
    if(insert){
        let status = await petdayscare.findByIdAndUpdate(petDaysCareId,{status:1})
        // console.log(status)
        return res.status(200).json({message:"petcare amount inserted successfully"})
    }
}

async function handleStatusAcceptInPetDaysCareAmount(req,res){
    console.log(req.params)
    let id =req.params.id
    try{
        let status = await petdayscareamount.findByIdAndUpdate(id,{status:1})
        console.log(status)
        return res.status(200).json({message:"status updated successfully"})
    }catch(e){
        console.error(e.message)
    }
}

async function  handleStatusRejectInPetDaysCareAmount(req,res){
    try{
    let {id}=req.params
    let status = await petdayscareamount.findByIdAndUpdate(id,{status:-1})
    return res.status(200).json({message:"status updated successfully"})
    }catch(e){
        console.error(e.message)
    }
}




module.exports={handlePetDaysCareAmount,handleStatusAcceptInPetDaysCareAmount,handleStatusRejectInPetDaysCareAmount}