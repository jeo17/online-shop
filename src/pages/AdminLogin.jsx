import React from 'react';
import "./AdminLogin.css"
import Box from "@mui/material/Box";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { useEffect } from "react";    

const AdminLogin = () => {
  const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
     const [email, setemail] = useState(null);
     const [password, setpassword] = useState(null);


     useEffect(() => {
      if (user && !loading) {
        navigate("/home");
      }
    });
    if (loading) {

   
   }


   if (!user && !loading){
    return (
      <Box className="admin-login"> 
      <ArrowBackIcon onClick={(eo) => {
          navigate("/")
      }} className='back-arrow'/>
<Box className="login-box" sx={{top:{xs: "20vh",sm:"unset",},left:{xs:"unset",sm:"unset"},transform:{xs:"scale(0.75)",sm:"scale(1)"},width:{xs:"365px",sm:"400px"}}} component={"div"}>
<h2>Admin Login</h2>
<form>
  <div className="user-box">
    <input autoComplete='username' type="email" name="" required="" onChange={(eo) => {
      setemail(eo.target.value)
    }}/>
    <label>Email</label>
  </div>
  <div className="user-box">
    <input  autoComplete='current-password' type="password" name="" required=""  onChange={(eo) => {
      setpassword(eo.target.value)
    }}/>
    <label>Password</label>
  </div>
  <button onClick={(eo) => {
      eo.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
      });
    
  }}>
    <span />
    <span />
    <span />
    <span />
    Submit
  </button>
</form>
</Box>

</Box>
  );
   }


}

export default AdminLogin;
