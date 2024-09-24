import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const SignUp = ({ setUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user)
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp
