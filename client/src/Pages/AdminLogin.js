import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
 const[admin,setadmin]=useState({
  email:"",
  password:""
 })

 const handlechange=(e)=>{
  setadmin({...admin,[e.target.name]:e.target.value})
 }
 const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email: admin.email,
        password: admin.password,
      });

      const adminData = response.data;
      localStorage.setItem('adminInfo', JSON.stringify(adminData));
      alert('Login successful');
      navigate('/admin-dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (

    <div className="container mt-5" >
      <h2 className="mb-4 text-center">Admin Login</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleLogin} className="border p-3 shadow-sm" style={{ backgroundColor: '#9fd1f7ff',borderRadius:"15px" }}>
            <div className="mb-3">
              <label htmlFor="rollNumber" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                name='email'
                value={admin.email}
                onChange={handlechange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name='password'
                value={admin.password}
                onChange={handlechange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default AdminLogin;
