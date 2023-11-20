import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// registation of new user
export const register = async(req,res) => {
        try{
            // secureing the password before store in database
           const hash = bcrypt.hashSync(req.body.password,5)
           const new_user = new User({
            ...req.body,
            password:hash
        })
           await new_user.save()
           res.status(200).send("registration successfull")
        }catch(err){
            res.status(500).send("Something went wrong")
        }
}

// login of user
export const login = async(req,res) => {
      try{
        const user = await User.findOne({username:req.body.username})

        if(!user) return res.status(404).send("User not Found")

        const isCorrect = bcrypt.compareSync(req.body.password,user.password)
        if(!isCorrect) return res.status(404).send("Wrong password or username")
        // genrating new token to the authentication purpose
        const token = jwt.sign(
          {
            id: user._id,
            isSeller: user.isSeller,
          },
          process.env.JWT_KEY
        );

        const {password, ...rest} = user._doc
        // store token in cookie to use authentication
         res
         .cookie("accessToken",token, {
            httpOnly:true,
         })
         .status(200).send(rest)
    }catch(err){
        res.status("400").send("User not found")
    }
}

// logout of user
export const logout = (req,res) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure:true,
      })
      .status(200).send("User has been logged out.")
}