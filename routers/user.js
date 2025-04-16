let express = require("express")
const { insertUser, handleSignin, verifyToken } = require("../controllers/user")
let userRouter = express.Router()

userRouter.post('/',insertUser)
userRouter.post('/signin',handleSignin)
userRouter.get('/verifytoken',verifyToken)





module.exports={userRouter}