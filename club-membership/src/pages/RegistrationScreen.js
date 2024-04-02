import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationScreen.css';

const RegistrationScreen = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        role: 'member', // Default to 'member'
      });
    
      const navigate = useNavigate(); // Step 2: Create an instance of navigate

      const handleChange = (event) => {
          const { name, value } = event.target;
          setFormState(prevState => ({
            ...prevState,
            [name]: value
          }));
      };
      
      const handleSubmit = (event) => {
          event.preventDefault();
          console.log('Form submitted:', formState);
          alert('Registration successful!');
          setFormState({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            role: 'member',
          });
      };
  
      const handleBack = () => {
          navigate('/'); // Navigate back to the WelcomeScreen
      };

      return (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" value={formState.firstName} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lastName" value={formState.lastName} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={formState.email} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Username:
            <input type="text" name="username" value={formState.username} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={formState.password} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Role:
            <select name="role" value={formState.role} onChange={handleChange} required>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <br />
          <button type="button" onClick={handleBack}>Back</button> {}
          <button type="submit">Register</button>
        </form>
      );
    };

export default RegistrationScreen;
