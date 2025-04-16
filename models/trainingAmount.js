const mongoose = require("mongoose")
const { training } = require("./training")
const Schema = mongoose.Schema
console.log(Schema.Types.ObjectId)
const trainingAmountSchema = new mongoose.Schema({
    amount:{type:String,required:true},
    duration:{type:String,required:true},
    description:{type:String,required:true},
    trainingId:{
        type:Schema.Types.ObjectId,
        ref:'trainings'
    },
    adminId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    status:{type:Number,default:0}
})


let trainingAmount = mongoose.model('trainingamount',trainingAmountSchema)


module.exports={trainingAmount}




