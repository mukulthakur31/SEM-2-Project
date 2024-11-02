import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { context } from '../main';
import axios from 'axios';

const Header = () => {
  const { authenticated, setisauthenticated } = useContext(context);
  const [admin, setadmin] = useState(false);

  const logouthandler = async () => {
    try {
      await axios.get('http://localhost:4000/logout', {
        withCredentials: true,
      });
      setisauthenticated(false);
      alert('Logged out');
    } catch (error) {
      console.log(error);
    }
  };

  // This useEffect ensures the admin state is updated based on the latest authentication status
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', {
          withCredentials: true,
        });
        setadmin(response.data.role === 'admin');
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdminStatus();
  }, [authenticated]); // Update admin status when authentication changes

  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {authenticated ? (
              <button onClick={logouthandler}>Logout</button>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          
          {admin && (
            <li>
              <Link to='/addjob'>Add Jobs</Link>
            </li>
          )}
          {admin && (
            <li>
              <Link to='/applications'>Applications</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
