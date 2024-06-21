import './Login.css'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



function Login(){
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate()
    //add resource
    function handleLogin(e) { 
        e.preventDefault()
        try {
            fetch("/login", {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                "Content-type": "application/json"
                }
            }).then((resp) =>{
                if (resp.ok) {
                    console.log('hello')
                    // navigate('/player')
                } else {
                    console.error('Login failed')
                }
            })
        } catch (error){
            console.error('Error:', error)
        }
            
        
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    return (
        <div className='loginPage'>
            <div className='initLoginContainer'>
                <h2>☄️ Login  ☄️</h2>
                <form className='loginForm' onSubmit={handleLogin}>
                    <input type="text" onChange={handleChange} className="form-control-login" placeholder="Username" name="username" required />
                    <input type="text" onChange={handleChange}className="form-control-login" placeholder="Email" name="email"  required />
                    <input type="password" onChange={handleChange}className="form-control-login" placeholder="Password" name="password" required/>
                    <button type="submit"  className="btn btn-primary mt-2">Login</button>
                </form>
            </div>
        </div>
    );
}
export default Login;