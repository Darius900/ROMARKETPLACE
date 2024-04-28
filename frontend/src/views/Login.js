import React, { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../views/Login.css'; 
import loginGraphic from '../assets/images/886.png';  
import { UserContext } from '../UserContext'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include' 
            });
            const data = await response.json();
            console.log('Login response:', data); 
            if (data.user) {
                setUser(data.user); 
                localStorage.setItem('user', JSON.stringify(data.user)); 
                navigate('/'); 
            } else {
                console.log('Login response:', data);
                console.error('Login failed: Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <img src={loginGraphic} alt="Login" className="login-graphic"/> 
            <h2>Log in to Romanian Marketplace</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default Login;
