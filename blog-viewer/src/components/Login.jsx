import { useAuth } from '../hooks/authContext';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/log-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (!response.ok) {
            console.log(data.error)
            return;
        }
        login(data.token);
        navigate('/')
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username' >Username: </label>
            <input type="text" id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor='password' >Password: </label>
            <input type="password" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Log in</button>
        </form>
    )
}

export default Login