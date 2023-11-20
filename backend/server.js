import express from "express"
import dotenv from "dotenv"
import connection from "./db.js"


const app = express()
dotenv.config()

app.use(express.json())

app.get("/",(req,res) => {
    res.send("welcome the backend of fiverr")
})

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