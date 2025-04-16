const {petdayscare} = require("../models/petdayscare")

const mongoose = require('mongoose')
const { getMyPetDataById } = require("./training")

async function petDaysCareRequest(req,res){
    console.log(req.body)
    let {petName,petAge,petBreed,gender,startDate,endDate,medication,food,grooming,description,mobile,status,userId}= req.body
    try{
        let insert = await petdayscare.create({petName,petAge,petBreed,gender,startDate,endDate,medication,food,grooming,description,mobile,status,userId})
        console.log(insert.length)
        return res.status(200).json({message:"inserted successfully"})
    }catch(e){
        console.log(e.message)
    }
}

async function petDaysCareData(req,res){
    try{
        let data = await petdayscare.find({})
        return res.json(data)
    }catch(e){
        console.log(e.message)
    }
}



async function  petDaysCareResponse(req,res){
    let data = await petdayscare.aggregate([{$lookup:{from:"users",localField:"userId",foreignField:"_id",as:'petcareandusers'}},{$lookup:{from:"petdayscareamounts",localField:"_id",foreignField:"petDaysCareId",as:"petcareandamounts"}},{$unwind:"$petcareandusers"},{$unwind:"$petcareandamounts"},{$sort:{"petcareandamounts._id":-1}}])
    console.log(data)
    return res.json(data)
}

async function  petDaysCareById(req,res){
    try{
    console.log("params " , req.params)
    let id = req.params.id
    if(!id){
        console.log("no id")
    }
    let objectId = new mongoose.Types.ObjectId(id)
    let data = await petdayscare.aggregate([{$lookup:{from:"users",localField:"userId",foreignField:"_id",as:'petcareandusers'}},{$lookup:{from:"petdayscareamounts",localField:"_id",foreignField:"petDaysCareId",as:"petcareandamounts"}},{$match:{"userId":objectId}},{$unwind:"$petcareandusers"},{$unwind:"$petcareandamounts"}])
    console.log(data)
    return res.json(data)
}catch(e){
    console.error(e.message)
}
}

async function getMyPetCarePlacedData(req,res){
    console.log
    (req.params)

    try{
        const {id}=req.params
        const objectId = new mongoose.Types.ObjectId(id)
        let placedPetCareData = await petdayscare.aggregate([{$lookup:{from:"users",localField:"userId",foreignField:"_id",as:"petcareandusers"}},{$match:{"userId":objectId}},{$unwind:"$petcareandusers"},{$sort:{_id:-1}}])
        return res.status(200).json(placedPetCareData)


    }catch(e){
        console.log(e.message)
    }
}




module.exports={petDaysCareRequest,petDaysCareData,petDaysCareResponse,petDaysCareById,getMyPetCarePlacedData}