import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {handleError,handleSuccess} from '../utils'
import Heading from '../component/Heading'
import Form from '../component/Form'
import Expenses from '../component/Expenses'
import './Home.css'

function Home() {
  const [loggedInUser,setLoggedInUser]=useState('')
  const navigate = useNavigate() //React hook for navigate
    
  const [transactions, setTransactions] = useState([]);


  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    fetchExpenses();
  },[])

  const handleLogout=(e)=>{
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token')
    handleSuccess("User Logged Out Successfully")
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }
  const baseUrl="http://localhost:8000"

  const fetchExpenses = async ()=>{
    try{
      const headers={
        headers:{
          'Authorization':localStorage.getItem('token')
        }
      }
      const response = await fetch(`${baseUrl}/expense`,headers)
      const result = await response.json();
      const {data}=result
      setTransactions(data)
    }catch(err){
      console.log(err)
    }
  }

  const addTransactions=async (submitTransaction)=>{
    const {text,amount}=submitTransaction;
    if(!text || !amount){
      handleError("All Fields are required");
      return;
    }
    try{
      const response = await fetch(`${baseUrl}/expense`, {
        method: 'POST',
        body: JSON.stringify(submitTransaction),
        headers:{
          'Authorization':localStorage.getItem('token'),
           'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    const {success,message}=result;
    if(success){
      handleSuccess(message);
    }
    fetchExpenses();
    }catch(err){
      handleError(err);
    }
  }


  const handleDelete=async (id)=>{
    
    try{
      const response = await fetch(`${baseUrl}/expense/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json' // Optional, since DELETE usually doesn't require a body
        }
      });
      const result = await response.json();
    const {success,message}=result;
    if(success){
      handleSuccess(message);
    }else{
      handleError(message);
    }
    fetchExpenses();
    }catch(err){
      handleError(err)
    }
  }



  const totalPositive = transactions
    .filter(t => t.amount >= 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const totalNegative = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className='home-container'>
    <Heading loggedInUser={loggedInUser} handleLogout={handleLogout} totalPositive={totalPositive} totalNegative={totalNegative} />
    <Form addTransactions={addTransactions}/>
    <Expenses transactions={transactions} handleDelete={handleDelete}/>
    <ToastContainer/>
    </div>
  )
}

export default Home