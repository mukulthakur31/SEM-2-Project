const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    required: true
  },
  applicants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      appliedAt: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['Applied', 'Under Review', 'Accepted', 'Rejected'],
        default: 'Applied'
      }
    }
  ],
});



// Create the Job model
const Jobs = mongoose.model('Job',JobSchema);
module.exports = Jobs;

// const jobs = [
//     {
//       title: 'Software Engineer',
//       company: 'Tech Innovators',
//       location: 'San Francisco, CA',
//       description: 'Develop and maintain web applications.',
//       requirements: 'Experience with JavaScript, Node.js, and MongoDB.',
//       salary: 120000,
//       jobType: 'Full-time',
//     },
//     {
//       title: 'Frontend Developer',
//       company: 'Creative Solutions',
//       location: 'New York, NY',
//       description: 'Create responsive and interactive user interfaces.',
//       requirements: 'Experience with React, CSS, and HTML.',
//       salary: 100000,
//       jobType: 'Contract',
//     },
//     {
//       title: 'Data Analyst',
//       company: 'Data Insights',
//       location: 'Austin, TX',
//       description: 'Analyze data and generate reports to support business decisions.',
//       requirements: 'Proficiency in SQL, Python, and data visualization tools.',
//       salary: 90000,
//       jobType: 'Part-time',
//     },
//     {
//       title: 'DevOps Engineer',
//       company: 'Cloud Masters',
//       location: 'Remote',
//       description: 'Manage CI/CD pipelines and cloud infrastructure.',
//       requirements: 'Experience with AWS, Docker, and Jenkins.',
//       salary: 115000,
//       jobType: 'Remote',
//     },
//     {
//       title: 'Product Manager',
//       company: 'Innovative Startups',
//       location: 'Boston, MA',
//       description: 'Lead product development from concept to launch.',
//       requirements: 'Strong understanding of product lifecycle and Agile methodologies.',
//       salary: 130000,
//       jobType: 'Full-time',
//     }
//   ];

//   Jobs.insertMany(jobs)
//   .then(()=>{
//     console.log("JObs added");
//   })
//   .catch(err => console.log(err))

