const mongoose = require("mongoose")
const Schema = mongoose.Schema


const trainingSchema = new mongoose.Schema({
    petName:{type:String,required:true},
    petAge:{type:String,required:true},
    petBreed:{type:String,required:true},
    gender:{type:String,required:true},
    trainingType:{type:Number,required:true},
    petBreed:{type:String,required:true},
    description:{type:String,required:true},
    mobile:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId,ref:'users'},
    status:{type:Number},

})

let training = mongoose.model('training',trainingSchema)
module.exports ={training}