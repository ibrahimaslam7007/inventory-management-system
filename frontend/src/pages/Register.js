import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const { data } = await API.post('/auth/register', {
        name,
        email,
        password
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Register</h2>

        {message && <p style={styles.error}>{message}</p>}

        <input
          style={styles.input}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Register
        </button>

        <p style={styles.text}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f4f6f8',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '380px',
    background: '#fff',
    padding: '28px',
    borderRadius: '14px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    border: '1px solid #eef2f7'
  },
  title: {
    marginBottom: '20px',
    color: '#111827'
  },
  input: {
    width: '100%',
    padding: '11px 12px',
    marginBottom: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '11px 14px',
    border: 'none',
    borderRadius: '8px',
    background: '#111827',
    color: '#fff',
    cursor: 'pointer'
  },
  error: {
    color: '#dc2626',
    marginBottom: '12px'
  },
  text: {
    marginTop: '12px',
    fontSize: '14px',
    color: '#374151'
  }
};

export default Register;