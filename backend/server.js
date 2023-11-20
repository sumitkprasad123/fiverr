import express from "express"
import dotenv from "dotenv"
import connection from "./db.js"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.router.js"

const app = express()
dotenv.config()

app.use(express.json())

app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)


app.listen(process.env.PORT, async() => {
   try{
      await connection
      console.log("Server is connected to mongoDB")
   }catch(err){
      console.log("server can not connected to mongoDB")
      console.log(err)
   }
   console.log(`server is running on port ${process.env.PORT}`)
})