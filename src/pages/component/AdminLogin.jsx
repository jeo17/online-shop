import React from 'react';
import "./AdminLogin.css"
import Box from "@mui/material/Box";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';
import { useState } from 'react';

const AdminLogin = () => {
    const navigate = useNavigate();
     const [email, setemail] = useState(null);
     const [password, setpassword] = useState(null);




    return (
        <Box className="admin-login"> 
        <ArrowBackIcon onClick={(eo) => {
            navigate("/")
            console.log("szzzz")
        }} className='back-arrow'/>
<div className="login-box">
  <h2>Admin Login</h2>
  <form>
    <div className="user-box">
      <input type="email" name="" required="" onChange={(eo) => {
        setemail(eo.target.value)
      }}/>
      <label>Email</label>
    </div>
    <div className="user-box">
      <input type="password" name="" required=""  onChange={(eo) => {
        setpassword(eo.target.value)
      }}/>
      <label>Password</label>
    </div>
    <button onClick={(eo) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
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
</div>

</Box>
    );
}

export default AdminLogin;
