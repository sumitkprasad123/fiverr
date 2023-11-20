import express from "express";

const userRouter = express.Router()

userRouter.get("/",(req,res) => {
    res.send("welcome the backend of fiverr")
})

export default userRouter