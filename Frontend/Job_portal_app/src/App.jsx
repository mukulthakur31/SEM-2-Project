import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Addjob from './Components/Addjob';
import axios from 'axios';
import { useContext } from 'react';
import { context } from './main';
import Application from './Components/Application';

function App() {
  const { setisauthenticated, setuser } = useContext(context);
 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', {
          withCredentials: true,
        });
        const userData = response.data.user;
        setuser(userData);
       
        setisauthenticated(true);
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.error || 'Login First');
      }
    };

    fetchProfile();
  }, [setuser, setisauthenticated]);

  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path='/' element={<Layout  />}>
            <Route path='' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/addjob' element={<Addjob />} />
            <Route path='/applications' element={<Application/>} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
