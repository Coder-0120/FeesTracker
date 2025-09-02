import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const StudentLogin = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/student/login', {
        rollNumber,
        password,
      });

      const student = response.data; 
      localStorage.setItem('studentInfo', JSON.stringify(student));
      alert('Login successful');
      navigate('/student-dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
   

    <div className="container mt-5" >
      <h2 className="mb-4 text-center">Student Login</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleLogin} className="border p-3 shadow-sm" style={{ backgroundColor: '#9fd1f7ff',borderRadius:"15px" }}>
            <div className="mb-3">
              <label htmlFor="rollNumber" className="form-label">Roll Number</label>
              <input
                type="text"
                className="form-control"
                id="rollNumber"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
                placeholder='Enter your roll number'
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 ">Login</button>
            <p className="text-center mt-3">Don't have an account? <Link to="/student-register">Register</Link></p>
          </form>
        </div>
      </div>
    </div>

  );
};

export default StudentLogin;
