import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const SignIn = ({ setUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user)
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            {error && <p>{error}</p>}
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn