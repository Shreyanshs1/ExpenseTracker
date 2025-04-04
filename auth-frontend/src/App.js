import './App.css';
import './pages/Main.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);

  const PrivateRoute =({element})=>{
    return isAuthenticated?element:<Navigate to='/login'/>
  }
  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
