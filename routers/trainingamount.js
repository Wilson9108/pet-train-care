const express  = require("express")
const { handleTrainingAmount, handleAcceptStatusInTrainingAmount,handleRejectStatusInTrainingAmount } = require("../controllers/trainingamount")
const trainingAmountRouter = express.Router()

trainingAmountRouter.post('/',handleTrainingAmount)
trainingAmountRouter.put('/statusaccept/:id',handleAcceptStatusInTrainingAmount)
trainingAmountRouter.put('/statusreject/:id',handleRejectStatusInTrainingAmount)


module.exports={trainingAmountRouter}