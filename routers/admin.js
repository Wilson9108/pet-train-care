const express = require("express")
const { insertAdmin,handleSignin } = require("../controllers/admin")
const adminRouter = express.Router()


adminRouter.post('/signup',insertAdmin)
adminRouter.post('/signin',handleSignin)





module.exports={adminRouter}
