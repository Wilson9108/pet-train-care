const mongoose = require("mongoose")
const Schema = mongoose.Schema



const petDaysCareAmountSchema = new mongoose.Schema({
    petAmount:{type:String,required:true},
    petDescription:{type:String,required:true},
    adminId:{type:Schema.Types.ObjectId,
        ref:"admin"
    },
    petDaysCareId:{
        type:Schema.Types.ObjectId,
        ref:"petdayscare"
    },
    status:{type:Number,default:0}
})

const petdayscareamount = mongoose.model('petdayscareamount',petDaysCareAmountSchema)

module.exports ={petdayscareamount}