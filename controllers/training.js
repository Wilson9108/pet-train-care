const {training} = require("../models/training")
let mongoose = require("mongoose")
async function getTrainingData(req,res){
    let data = await training.find({})
    return res.json(data)
}

async function trainingRequest(req,res){
    console.log(req.body)
    if(!req.body.userId){
        console.log("please user login")
        return 
    }
    try{
    const {petName,petAge,petBreed,gender,trainingType,description,mobile,status,userId}=req.body
    let insert = await training.create({petName:petName,petAge:petAge,petBreed,petBreed,gender:gender,trainingType:trainingType,description,description,mobile,status:status,userId:userId})
    return res.status(200).json({message:"inserted successfully"})
    }catch(e){
        console.error(e.message)
        return res.status(500).json({message:"failed to insert data",error:e.message})
    }
}

async function trainingResponse(req,res){
    let data = await training.aggregate([{$lookup:{from:"users",localField:"userId",foreignField:"_id",as:"userandtraining"}},{$lookup:{from:"trainingamounts",localField:"_id",foreignField:"trainingId",as:"trainingandamount"}},{$unwind:"$userandtraining"},{$unwind:"$trainingandamount"},{$sort:{"trainingandamount._id":-1}}])
    return res.json(data)
}

async function getMyPetDataById(req,res){
    console.log(req.body)
    console.log(req.params)
    const id  = req.params.id
    if(!id){
        console.log("no id")
        return
    }
    const objectId = new  mongoose.Types.ObjectId(id)
    console.log(objectId)

    let myPetData = await training.aggregate([{$lookup:{from:"users",localField:"userId",
        foreignField:"_id",as:"userandtraining"
    }},{$lookup:{from:"trainingamounts",localField:"_id",foreignField:"trainingId",as:"trainingamountdata"}},{$match:{"userId":objectId}},{$unwind:"$userandtraining"},{$unwind:"$trainingamountdata"}
])
    console.log(myPetData)
   return  res.json(myPetData)
}

async function getMyTrainingPlacedData(req,res){
    console.log("params",req.params.id)
    try{
        const {id}=req.params
        if(!id){
            console.log("no id")
            return
        }
        const objectId = new mongoose.Types.ObjectId(id)
        let myPlacedData = await training.aggregate([{$lookup:{from:"users",localField:"userId",foreignField:"_id",as:"trainingandusers"}},{$match:{"userId":objectId}},{$unwind:"$trainingandusers"},{$sort:{_id:-1}}])
        return res.status(200).json(myPlacedData)


    }catch(e){
        console.log(e.message)
    }
}





module.exports={trainingRequest,getTrainingData,trainingResponse,getMyPetDataById,getMyTrainingPlacedData}