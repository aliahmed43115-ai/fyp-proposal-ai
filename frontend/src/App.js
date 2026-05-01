import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Dashboard from './Dashboard';

const GOLD = '#C9A84C';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = async () => {
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setUser(email);
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return <Dashboard user={user} onLogout={() => { auth.signOut(); setUser(null); }} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #080808 0%, #111111 50%, #0D0D0D 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background glow effects */}
      <div style={{
        position: 'absolute', top: '20%', left: '30%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '30%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      {/* Glass Card */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: '24px',
        padding: '48px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 0 60px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
        position: 'relative'
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-1px' }}>Proposal</span>
            <span style={{ fontSize: '28px', fontWeight: '800', color: GOLD, letterSpacing: '-1px' }}>AI</span>
          </div>
          <p style={{ color: '#666', fontSize: '14px', fontWeight: '300' }}>
            {isLogin ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(255,59,59,0.1)', border: '1px solid rgba(255,59,59,0.3)',
            borderRadius: '12px', padding: '12px 16px', marginBottom: '20px',
            color: '#ff6b6b', fontSize: '13px', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#888', fontSize: '12px', fontWeight: '400', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '12px', padding: '14px 16px',
              color: '#fff', fontSize: '14px', fontWeight: '300',
              outline: 'none', boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = GOLD}
            onBlur={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ color: '#888', fontSize: '12px', fontWeight: '400', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '12px', padding: '14px 16px',
              color: '#fff', fontSize: '14px', fontWeight: '300',
              outline: 'none', boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = GOLD}
            onBlur={(e) => e.target.style.borderColor = 'rgba(201,168,76,0.15)'}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', background: `linear-gradient(135deg, ${GOLD} 0%, #E2C06A 100%)`,
            border: 'none', borderRadius: '12px', padding: '15px',
            color: '#080808', fontSize: '15px', fontWeight: '700',
            cursor: 'pointer', letterSpacing: '0.3px',
            boxShadow: '0 4px 24px rgba(201,168,76,0.3)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 32px rgba(201,168,76,0.5)'}
          onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 24px rgba(201,168,76,0.3)'}
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>

        {/* Toggle */}
        <p style={{ textAlign: 'center', color: '#555', fontSize: '13px', marginTop: '24px', fontWeight: '300' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: GOLD, cursor: 'pointer', fontWeight: '500' }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </p>

      </div>
    </div>
  );
}

export default App;