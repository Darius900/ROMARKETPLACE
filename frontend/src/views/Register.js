// src/components/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../views/Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('buyer'); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

      

        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, role })
        });

        if (response.ok) {
           
            navigate('/login');
        } else {
           
            console.error('Registration failed.');
        }
    };

    return (
        <div className="register-container">
            <h2></h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <div className="input-group">
                <label>Role:</label>
                <select className='labelReg' value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
                <button className="buttonreg" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
