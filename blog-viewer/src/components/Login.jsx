import { useAuth } from '../hooks/authContext';
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = setState('');
    const [password, setPassword] = setState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/log-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (!response.ok) {
            setError(data.error)
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