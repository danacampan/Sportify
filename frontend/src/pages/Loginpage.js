import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
    },
    imageSection: {
      flex: 1,
      height: '100vh',
      backgroundImage: "url('/fata.jpeg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    formSection: {
      flex: 1,
      backgroundColor: '#062235',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      fontFamily: "'Days One', sans-serif",
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      margin: '20px 0',
    },
    title: {
      fontFamily: "'Days One', sans-serif",
      fontSize: '2rem',
      marginBottom: '30px',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      marginBottom: '15px',
      marginTop: '10px',
      border: '2px solid #ff4747',
      borderRadius: '15px',
      backgroundColor: '#021726',
      color: 'white',
      fontFamily: "'Days One', sans-serif",
      outline: 'none',
      appearance: 'none',
    },
    button: {
      width: '50%',
      padding: '12px',
      backgroundColor: '#ff4747',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      fontSize: '16px',
      cursor: 'pointer',
      fontFamily: "'Days One', sans-serif",
      marginTop: '20px',
    },
    link: {
      color: '#ff4747',
      textDecoration: 'none',
      marginTop: '10px',
      textAlign: 'center',
    },
    centeredText: {
      textAlign: 'center',
      marginTop: '15px',
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Login failed');
      } else {
        const data = await response.json();
        const { token, user } = data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        window.location.href = '/';
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}></div>
      <div style={styles.formSection}>
        <h1 style={styles.title}>Bine ai revenit!</h1>
        <form style={styles.form} onSubmit={handleLogin}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              placeholder="Introdu un email..."
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label style={styles.label}>
            Parola
            <input
              type="password"
              placeholder="Introdu o parolă..."
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Se conectează...' : 'Logare'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
          <p style={styles.centeredText}>
            Nu ai un cont?{' '}
            <a href="/register" style={styles.link}>
              Înregistrare
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
