import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Applications.css'  // Import the CSS file

const Application = () => {

    const [application, setApplication] = useState([])

    useEffect(() => {
        const fetchApp = async () => {
            const res = await axios.get('http://localhost:4000/allApp', {
                withCredentials: true
            })
            console.log(res.data)
            setApplication(res.data)
        }
        fetchApp()
    }, [])

    console.log(application);

    return (
        <div className="application-container">
            {
                application.map((app) => (
                    <div key={app._id} className="application-card">
                        <h1>Name: {app.user.firstname} {app.user.lastname}</h1>
                        <h1>Email: {app.user.email}</h1>
                        <h2>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</h2>
                        <h1>Title: {app.job.title}</h1>
                        <h1>Company: {app.job.company}</h1>
                        <h1>Location: {app.job.location}</h1>
                    </div>
                ))
            }
        </div>
    )
}

export default Application
