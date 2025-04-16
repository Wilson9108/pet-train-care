const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    adminEmail:{type:String,required:true},
    password:{type:String,required:true}
})


let admin = mongoose.model('admin',adminSchema)


module.exports={admin}