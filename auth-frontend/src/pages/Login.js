import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {handleError,handleSuccess} from '../utils'

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    })
    //Base Url Here
    const baseUrl="https://expensetracker-liig.onrender.com/auth"

    const navigate = useNavigate() //React hook for navigate

    const handleChange=(e)=>{
      const {name,value}=e.target;
      const copyLoginInfo = {...loginInfo}
      copyLoginInfo[name]=value;
      setLoginInfo(copyLoginInfo);
    }

    const handleSubmit=async (e)=>{
            e.preventDefault()
            const{email,password}=loginInfo;
            if(!email || !password){
                handleError("All fields are required")
                return;
            }
            try{
                const response = await fetch(`${baseUrl}/login`, {
                    method: 'POST',
                    body: JSON.stringify(loginInfo),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                const result = await response.json();
                // console.log(result);
                const {message,success,error,jwtToken,name}=result;
                if(success){
                    handleSuccess(message)
                    localStorage.setItem('token',jwtToken);
                    localStorage.setItem('loggedInUser',name)
                    setTimeout(()=>{
                        navigate('/home')
                    },1000);
                }else if(error){
                    handleError(error.details[0].message)
                }
                else{
                    handleError(message)
                }
            }catch(err){
                console.log(err)    
            }
        }
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" name='email' className="input-field" onChange={handleChange}/>
      <input type="password" placeholder="Password" name='password' className="input-field" onChange={handleChange}/>
      
      <button className="btn">Login</button>
      </form>
      <p>
        New user? <Link to="/signup" className="link">Create account</Link>
      </p>
      <ToastContainer/>
    </div>
  )
}

export default Login