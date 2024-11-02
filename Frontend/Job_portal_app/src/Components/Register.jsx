import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { context } from '../main';
import axios from 'axios';
import './Register.css';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRole] = useState('user');  // Default value is 'user'

  const { setisauthenticated, authenticated } = useContext(context);

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log('Role before submitting:', roles);  // Debugging: Log role before submission

    try {
      await axios.post(
        `http://localhost:4000/register`,
        {
          firstname,
          lastname,
          mobile,
          email,
          password,
          roles,
        },
        {
          withCredentials: true,
        }
      );
      console.log('Success');
      alert('Signup Successful');
      setisauthenticated(true);
      // Clear fields
      setEmail('');
      setFirstname('');
      setLastname('');
      setPassword('');
      setMobile('');
      setRole('user');  // Reset to 'user'
    } catch (error) {
      console.error('Error during registration:', error.response.data.error);  // Debugging: Log error
      alert(error.response.data.error);
      setisauthenticated(false);
    }
  };

  if (authenticated) return <Navigate to="/" />;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input value={firstname} required onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="First Name" />
          <input value={lastname} required onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Last Name" />
          <input value={email} required onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
          <input value={password} required onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <input value={mobile} required onChange={(e) => setMobile(e.target.value)} type="text" placeholder="Mobile No." />
          <div className="role-selection">
            <label>
              <input
                type="radio"
                value="user"
                checked={roles === 'user'}
                onChange={(e) => setRole(e.target.value)}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                value="admin"
                checked={roles === 'admin'}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </div>
  );
}

export default Register;
