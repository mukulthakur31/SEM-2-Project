import React, { useContext, useEffect, useState } from "react";
import {Navigate } from 'react-router-dom'
import { context } from '../main';
import axios from "axios";


function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { authenticated,setisauthenticated} = useContext(context);
  useEffect(() => {
    console.log('authenticated state changed:', authenticated);
  }, [authenticated]);

  const submitHandler = async (e) => {
    e.preventDefault();
 
    try {
       await axios.post(`http://localhost:4000/login`, {
        password,
        email,
      },{
        withCredentials:true
      });
      console.log("success");
      alert("Login Successfull");
      setisauthenticated(true);
      setemail('')
      setpassword('')
    } catch (error) {
      alert(error.response.data.error);
      setisauthenticated(false);
      
    }
  };
  

  if(authenticated) return <Navigate to={'/'}/>
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={email}
            required
            onChange={(e) => setemail(e.target.value)}
            type="text"
            placeholder="email"
          />

          <input
            value={password}
            required
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="password"
          />

          <button type="submit" >
            Log In
          </button>
         
        </form>
      </section>
    </div>
  );
}

export default Login;
