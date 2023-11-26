import express from "express"
import dotenv from "dotenv"
import connection from "./db.js"
import userRouter from "./routes/user.router.js"
import authRouter from "./routes/auth.router.js"
import gigRouter from "./routes/gig.router.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

app.use(cookieParser())
app.use(cors({ origin:"http://127.0.0.1:5173",credentials:true }));
app.use(express.json())



app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/gig",gigRouter)

// it's a global error-handling middleware because it doesn't specify a path,
// meaning it will be called for all routes.
app.use((err,req,res,next) => {
   // err: This is an error object that is passed to the middleware.
   // If there is an error in the previous middleware or route handler, 
   // it will be passed to this middleware for handling.
   const errorStatus = err.status || 500;
   const errorMessage = err.message || "Something went wrong"

   return res.status(errorStatus).send(errorMessage);
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
});