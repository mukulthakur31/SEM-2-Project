import React, { useState } from 'react';
import axios from 'axios';
import './Addjob.css'


const Addjob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [requirements,setrequirements]=useState('')
  const[jobType,setjobtype]=useState('')
  const [company,setcompany]=useState('')
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:4000/add', {
        title,
        description,
        company,
        requirements,
        jobType,
        location,
        salary
      }, {
        withCredentials: true
      });
      setSuccess('Job added successfully!');
      setTitle('');
      setDescription('');
      setLocation('');
      setSalary('');
      setcompany('')
      setrequirements('')
      setjobtype('')
    } catch (err) {
      setError('Failed to add job. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="add-job-form">
      <h2>Add a New Job</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setcompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="requiremnets">requirements:</label>
          <input
            type="text"
            id="requirements"
            value={requirements}
            onChange={(e) => setrequirements(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="jobtype">jobtype:</label>
          <input
            type="text"
            id="jobType"
            value={jobType}
            onChange={(e) => setjobtype(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default Addjob;
