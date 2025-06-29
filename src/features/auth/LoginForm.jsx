import React from 'react';
import { AuthService } from '../../services/authService';

export default function LoginForm() { 
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);


    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const result = await AuthService.login({ email, password });
            if (result) {
                // Handle successful login, e.g., redirect or update state
                console.log("Login successful", result);
            }
        } catch (err) {
            setError(err.message || "Login failed");
        }

    }

    return (
        <form onSubmit={ onSubmit }>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Entrar</button>
        </form>
    )
}