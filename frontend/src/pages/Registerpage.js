import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function RegisterPage() {
  const [nume, setNume] = useState('');
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [confirmaParola, setConfirmaParola] = useState('');
  const [dataNasterii, setDataNasterii] = useState('');
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const styles = {
    container: {
      display: 'flex',
    },
    imageSection: {
      flex: 1,
      height: '900px',
      backgroundImage: "url('/fata.jpeg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
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
      marginBottom: '5px',
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
      position: 'relative',
    },
    dateInput: {
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
      position: 'relative',
      backgroundImage:
        "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27%23ff4747%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M19 3h-1V1h-2v2H8V1H6v2H5C3.89 3 3 3.89 3 5v15c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 17H5V10h14v10zM5 8V5h14v3H5zm2 3h5v5H7v-5z%27/%3E%3C/svg%3E')",
      backgroundSize: '20px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
      color: 'white',
      justifyContent: 'flex-start',
    },
    registerButton: {
      width: '100%',
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
    customCheckbox: {
      backgroundColor: isOrganizer ? '#ff4747' : '#062235',
      color: isOrganizer ? '#fff' : '#ff4747',
      border: isOrganizer ? '2px solid #ff4747' : '2px solid #062235',
    },
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (parola !== confirmaParola) {
      setErrorMessage('Parolele nu se potrivesc!');
      return;
    }

    const userData = {
      username: nume,
      email,
      password: parola,
      dateOfBirth: dataNasterii,
      role: isOrganizer ? 'organizer' : 'user',
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Cont creat cu succes! Te poți autentifica.');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'A apărut o eroare.');
      }
    } catch (error) {
      setErrorMessage('Eroare la conexiune cu serverul.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}></div>
      <div style={styles.formSection}>
        <h1 style={styles.title}>Bine ai venit!</h1>
        <form style={styles.form} onSubmit={handleRegister}>
          <label style={styles.label}>
            Nume și prenume
            <input
              type="text"
              placeholder="Introdu un nume..."
              style={styles.input}
              value={nume}
              onChange={(e) => setNume(e.target.value)}
            />
          </label>
          <label style={styles.label}>
            Data nașterii
            <input
              type="date"
              style={styles.dateInput}
              value={dataNasterii}
              onChange={(e) => setDataNasterii(e.target.value)}
            />
          </label>
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
            Parolă
            <input
              type="password"
              placeholder="Introdu o parolă..."
              style={styles.input}
              value={parola}
              onChange={(e) => setParola(e.target.value)}
            />
          </label>
          <label style={styles.label}>
            Confirmă parola
            <input
              type="password"
              placeholder="Confirmă parola..."
              style={styles.input}
              value={confirmaParola}
              onChange={(e) => setConfirmaParola(e.target.value)}
            />
          </label>

          <div style={styles.checkboxContainer}>
            <Form.Check
              type="checkbox"
              id="organizer"
              label="Cont de organizator"
              checked={isOrganizer}
              onChange={() => setIsOrganizer(!isOrganizer)}
              style={styles.customCheckbox}
            />
          </div>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          <button type="submit" style={styles.registerButton}>
            Înregistrare
          </button>
          <p style={styles.centeredText}>
            Ai deja un cont?{' '}
            <a href="/login" style={styles.link}>
              Autentificare
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
