import React from 'react';
import { AuthService } from '../../services/authService';
import './AuthPage.scss';

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
        <form className="default-form" onSubmit={ onSubmit }>
            <div className='form-group'>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button className='btn w-100' type="submit">Entrar</button>
        </form>
    )
}