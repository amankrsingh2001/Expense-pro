import {Router} from "express"
import {  login, signUp, verifyUser } from "../controller/userController"
import { auth } from "../middleware/auth"

export const userRouter = Router()


userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.post('/verifyUser', auth, verifyUser)