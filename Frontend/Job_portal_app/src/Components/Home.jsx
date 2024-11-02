// Home.jsx

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Home.css'
import { Navigate } from 'react-router-dom';
import { context } from '../main';


const Home = () => {
  const [jobs, setjobs] = useState([]);
  const [search,setsearch]=useState(false)
  const [input,setinput]=useState('')
  const [searchjob,setsearchjob]=useState([])
 const {authenticated,user}=useContext(context)
 const [appliedJobs, setAppliedJobs] = useState([]);


  useEffect(() => {
    fetchjobs();
  }, []);

  const fetchjobs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/all', { withCredentials: true });
      
      
      setjobs(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

 
  const handleinput=async()=>{
     try {
      console.log("enter");
      
      const searchedjobs=await axios.get(`http://localhost:4000/jobs/${input}`,{
        withCredentials:true
      }) 
     setsearchjob(searchedjobs.data)
     setsearch(true)
     setinput('')
     } catch (error) {
      console.log(error);
      
     }
  }

  useEffect(() => {
    const fetchAppliedJobs = async () => {
        try {
            const res = await axios.get('http://localhost:4000/user/applications', {
                withCredentials: true
            });
            setAppliedJobs(res.data.Apply || []);
        } catch (error) {
            console.error('Error fetching applied jobs:', error);
        }
    };

    fetchAppliedJobs()
}, []);

  const handleapply = async (jobId ) => {
    console.log(jobId);
  
    
    try {
        const res = await axios.post('http://localhost:4000/apply', { job:jobId}, {
            withCredentials: true
        });
        console.log(res);
        if (res.status === 201) {
            alert('Application submitted successfully!');
            setAppliedJobs([...appliedJobs, jobId]);
        } else {
            alert('Failed to apply.');
        }
    } catch (error) {
        console.error(error);
        alert(error.response.data.mes);
    }
};


  if(!authenticated) return <Navigate to={'/login'}/>

  return (
    <>

    <div className='top'>
    <input type="text" value={input} onChange={(e)=> setinput(e.target.value)}/>
    <button onClick={handleinput}>Search</button>
    </div>

    
    <div className='jobs'>
        {search ? (
          searchjob.length > 0 ? (
            searchjob.map((job) => (
              <div key={job.id}>
                <h1>Position:{job.title}</h1>
                <h2>CompanyName:{job.company}</h2>
                <h3>Description:{job.description}</h3>
                <h3>Location:{job.location}</h3>
                <h3>Requirements:{job.requirements}</h3>
                <h3>Salary:{job.salary}</h3>
                <h3>Job Type{job.jobType}</h3>
                <button onClick={() => handleapply(job._id)}
            disabled={appliedJobs.includes(job._id)}
>
    {appliedJobs.includes(job._id) ? 'Applied' : 'Apply'}</button>
              </div>
            ))
          ) : (
            <h3>No jobs found for your search.</h3>
          )
        ) : (
          jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id}>
               <h1>Position:{job.title}</h1>
                <h2>CompanyName:{job.company}</h2>
                <h3>Description:{job.description}</h3>
                <h3>Location:{job.location}</h3>
                <h3>Requirements:{job.requirements}</h3>
                <h3>Salary:{job.salary}</h3>
                <h3>Job Type{job.jobType}</h3>
                <button onClick={() => handleapply(job._id, user._id)}
    disabled={appliedJobs.includes(job._id)}
>
    {appliedJobs.includes(job._id) ? 'Applied' : 'Apply'}</button>
              </div>
            ))
          ) : (
            <h3>No jobs available.</h3>
          )
        )}
      </div>

    </>
  )
};

export default Home;
