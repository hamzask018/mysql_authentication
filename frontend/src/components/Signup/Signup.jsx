import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to register the user
      const response = await axios.post('http://localhost:4000/api/register', formData);
      
      if (response.status === 201) {
        // Clear the form data after successful registration
        setFormData({ name: '', email: '', password: '' });
        
        // Redirect to the login page or show a success message
        alert('User registered successfully!');
        navigate('/login'); // Adjust the route as needed
      } else {
        // Handle cases where the registration is not successful
        alert(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };
  


  return (
    <div className='box'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='heading'>Sign Up</h1>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Submit</button>
        <p>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Login here</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
