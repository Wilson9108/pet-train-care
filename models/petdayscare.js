const mongoose = require("mongoose")
const Schema = mongoose.Schema

const petCareSchema = new mongoose.Schema({
    petName:{type:String,required:true},
    petAge:{type:String,required:true},
    petBreed:{type:String,required:true},
    gender:{type:String,required:true},
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true},
    medication:{type:String},
    grooming:{type:String},
    food:{type:String},
    description:{type:String},
    mobile:{type:String},
    status:{type:Number},
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
})

const petdayscare  = mongoose.model('petdayscare',petCareSchema)

module.exports={petdayscare}