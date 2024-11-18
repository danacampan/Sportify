import React from "react";
import "@fontsource/days-one";

function LoginPage() {
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
    },
    imageSection: {
      flex: 1,
      height: "100vh",
      backgroundImage: "url('/fata.jpeg')", // Asigură-te că această imagine există în proiectul tău.
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    },
    formSection: {
      flex: 1,
      backgroundColor: "#062235",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
      fontFamily: "'Days One', sans-serif",
    },
    form: {
      width: "100%",
      maxWidth: "400px",
      margin: "20px 0",
    },
    title: {
      fontFamily: "'Days One', sans-serif",
      fontSize: "2rem",
      marginBottom: "30px",
      textAlign: "center",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      textAlign: "left",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      marginBottom: "15px",
      border: "2px solid #ff4747",
      borderRadius: "15px",
      backgroundColor: "#021726",
      color: "white",
      fontFamily: "'Days One', sans-serif",
      outline: "none",
      appearance: "none",
    },
    button: {
      width: "50%", // schimbă width pentru a face butonul mai scurt (poți ajusta această valoare)
      padding: "12px",
      backgroundColor: "#ff4747",
      color: "white",
      border: "none",
      borderRadius: "15px",
      fontSize: "16px",
      cursor: "pointer",
      fontFamily: "'Days One', sans-serif",
      marginTop: "20px",
    },
    link: {
      color: "#ff4747",
      textDecoration: "none",
      marginTop: "10px",
      textAlign: "center",
    },
    centeredText: {
      textAlign: "center",
      marginTop: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}></div>
      <div style={styles.formSection}>
        <h1 style={styles.title}>Bine ai revenit!</h1>
        <form style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              placeholder="Introdu un email..."
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Parolă
            <input
              type="password"
              placeholder="Introdu o parolă..."
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>
            Logare
          </button>
          <p style={styles.centeredText}>
            Nu ai un cont? <a href="#register" style={styles.link}>Înregistrare</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
