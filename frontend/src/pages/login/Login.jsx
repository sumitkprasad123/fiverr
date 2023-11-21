// import React from 'react'
import "./Login.scss"
import {useState} from "react";
import newRequest from "../../utils/newRequest"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
     let res = await axios.post("http://localhost:8800/api/auth/login",{username,password},{withCredentials:true})
    //  console.log({"data":res.data})
      // const res = await newRequest.post("/auth/login",{username,password});
      console.log({"res":res})
      localStorage.setItem("currentUser",JSON.stringify(res.data))
      // navigate("/")
    }catch(err){
      setError(err.response.data)
    }
  };

  return (
    <div className='login'>
       <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
         <label htmlFor="">Username</label>
         <input 
            name="username"
            type="text"
            placeholder="Sumit"
            onChange={(e) => setUsername(e.target.value)}
         />

         <label htmlFor="">Password</label>
         <input 
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
         />

         <button type="submit">Login</button>
         {error && error}
       </form>
    </div>
  )
}

export default Login