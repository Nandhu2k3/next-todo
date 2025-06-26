'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { styles } from '@/lib/styles';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push('/'); // Redirect on successful login/signup
        } catch (err: any) {
            // Your original error handling logic
            switch (err.code) {
                case 'auth/user-not-found':
                case 'auth/invalid-credential':
                    setError('No account found with this email. Please Sign Up.');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password. Please try again.');
                    break;
                case 'auth/email-already-in-use':
                    setError('This email address is already in use.');
                    break;
                case 'auth/weak-password':
                    setError('Password should be at least 6 characters.');
                    break;
                case 'auth/invalid-email':
                    setError('Please enter a valid email address.');
                    break;
                default:
                    setError('An authentication error occurred. Please try again.');
                    break;
            }
        }
    };

    return (
        <div style={styles.authContainer}>
            <div style={styles.authBox}>
                <h2 style={styles.title}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                {error && <p style={styles.errorBox}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.authForm}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={styles.inputField} required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={styles.inputField} required />
                    <button type="submit" style={styles.submitButton}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleAuth}>
                    {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;