import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {handleError,handleSuccess} from '../utils'

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
            name:'',
            email:'',
            password:''
        })
    const navigate = useNavigate() //React hook for navigate

    //Base Url Here
    const baseUrl="https://expensetracker-liig.onrender.com/auth"

    const handleChange=(e)=>{
        const {name,value}=e.target;
        const copySignupInfo = {...signupInfo}
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo);
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const{name, email,password}=signupInfo;
        if(!name || !email || !password){
            handleError("All fields are required")
            return;
        }
        try{
            const response = await fetch(`${baseUrl}/signup`, {
                method: 'POST',
                body: JSON.stringify(signupInfo),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const result = await response.json();
            console.log(result);
            const {message,success,error}=result;
            if(success){
                handleSuccess(message)
                setTimeout(()=>{
                    navigate('/login')
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
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" autoFocus placeholder="Name" name='name' className="input-field" onChange={handleChange}/>
            <input type="email" placeholder="Email" name='email' className="input-field" onChange={handleChange}/>
            <input type="password" placeholder="Password" name='password' className="input-field" onChange={handleChange}/>
      <button type='submit' className="btn">Signup</button>
      </form>
      <p>
        Already a user? <Link to="/login" className="link">Login</Link>
      </p>
      <ToastContainer/>
    </div>
  )
}

export default Signup