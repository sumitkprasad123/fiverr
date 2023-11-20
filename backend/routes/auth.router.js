import express from "express"
import {register} from "../controllers/auth.controller.js"
import {login} from "../controllers/auth.controller.js"
import {logout} from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",logout)

export default authRouter