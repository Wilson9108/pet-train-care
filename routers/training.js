const express = require("express")
const { trainingRequest, getTrainingData, trainingResponse, getMyPetDataById, getMyTrainingPlacedData } = require("../controllers/training")
const trainingRouter = express.Router()

trainingRouter.get("/",getTrainingData)
trainingRouter.post('/',trainingRequest)
trainingRouter.get('/response',trainingResponse)
trainingRouter.get('/getMyPetData/:id',getMyPetDataById)
trainingRouter.get('/getMyTrainingPlaceddata/:id',getMyTrainingPlacedData)




module.exports={trainingRouter}