const express = require("express")
const { petDaysCareRequest, petDaysCareData,petDaysCareResponse,petDaysCareById, getMyPetCarePlacedData } = require("../controllers/petdayscare")
const petDaysCareRouter = express.Router()

petDaysCareRouter.post('/',petDaysCareRequest)
petDaysCareRouter.get('/',petDaysCareData)
petDaysCareRouter.get('/response',petDaysCareResponse)
petDaysCareRouter.get('/response/:id',petDaysCareById)
petDaysCareRouter.get('/petcareplaceddata/:id',getMyPetCarePlacedData)





module.exports={petDaysCareRouter}