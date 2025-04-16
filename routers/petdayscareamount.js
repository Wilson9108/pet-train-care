const express = require("express")
const petDaysCareAmountRouter = express.Router()
const {handlePetDaysCareAmount,handleStatusAcceptInPetDaysCareAmount,handleStatusRejectInPetDaysCareAmount}=require('../controllers/petdayscareamount')

petDaysCareAmountRouter.post('/',handlePetDaysCareAmount)
petDaysCareAmountRouter.put('/statusaccept/:id',handleStatusAcceptInPetDaysCareAmount)
petDaysCareAmountRouter.put('/statusreject/:id',handleStatusRejectInPetDaysCareAmount)






module.exports ={petDaysCareAmountRouter}