import React, { useState } from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:''
  }); 
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/login', formData);
      
      if (response.status === 200) {
        // Assuming the server sends a token on successful login
        const token = response.data.token; // Adjust this according to your backend response structure
        
        // Store the token in local storage or in a global state (like context) if needed
        localStorage.setItem('authToken', token);
        
        // Redirect the user to the desired page after successful login
        navigate('/'); 
      } else {
        alert(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };
  
  return (
    <div className='box'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='heading'>Login Up</h1>
      
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
  
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          <button type="submit" value="Submit">Submit</button>
          <p>Create an account? <span onClick={()=>navigate("/register")}>Signup here</span></p>
        </form>
        
    </div>
  )
}

export default Login
