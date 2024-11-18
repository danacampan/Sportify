import React, { useState } from "react";

function Homepage() {
  // Evenimente simulate
  const allEvents = [
    { id: 1, image: "meci_fotbal.jpg", title: "Meci fotbal", details: "STEAUA VS DINAMO", time: "10 Noiembrie, 16:00-18:00", location: "Strada Cluj, Nr.1" },
    { id: 2, image: "meci_tenis.jpg", title: "Meci tenis", details: "Pers 1 VS Pers 2", time: "10 Noiembrie, 16:00-18:00", location: "Strada Cluj, Nr.1" },
    { id: 3, image: "meci_hambal.jpg", title: "Meci handbal", details: "Echipa A VS Echipa B", time: "11 Noiembrie, 14:00-16:00", location: "Strada București, Nr.2" },
    { id: 4, image: "meci_baschet.jpg", title: "Meci baschet", details: "Echipa X VS Echipa Y", time: "12 Noiembrie, 17:00-19:00", location: "Strada Timișoara, Nr.3" },
    { id: 5, image: "meci_volei.jpg", title: "Meci volei", details: "Echipa C VS Echipa D", time: "13 Noiembrie, 12:00-14:00", location: "Strada Iași, Nr.4" },
    { id: 6, image: "atletism.jpg", title: "Atletism", details: "Cursa 100m", time: "18 Noiembrie, 09:00-11:00", location: "Strada Brașov, Nr.5" },
  ];

  // Starea pentru pagina curentă
  const [currentPage, setCurrentPage] = useState(1);

  // Numărul de evenimente pe pagină
  const eventsPerPage = 2;

  // Calcularea evenimentelor afișate pe pagina curentă
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calcularea numărului total de pagini
  const totalPages = Math.ceil(allEvents.length / eventsPerPage);

  // Funcție pentru a schimba pagina
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={styles.container}>
      {/* Main Content */}
      <div style={styles.content}>
        <h2 style={styles.title}>Evenimente</h2>

        {/* Afișarea evenimentelor curente */}
        {currentEvents.map((event) => (
          <div key={event.id} style={styles.eventCard}>
            <img src={event.image} alt={event.title} style={styles.eventImage} />
            <div style={styles.eventDetails}>
              <h3 style={styles.eventTitle}>{event.title}</h3>
              <p style={styles.eventTime}>{event.time}</p>
              <p style={styles.eventDetailsButton}>{event.details}</p>
              <p style={styles.eventLocation}>{event.location}</p>
            </div>
          </div>
        ))}

        {/* Paginare */}
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              style={{
                ...styles.pageButton,
                backgroundColor: currentPage === index + 1 ? "#e63946" : "#1c2541",
              }}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Styles (CSS-in-JS)
const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#0b132b",
    color: "#ffffff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  content: {
    width: "95%",
    maxWidth: "900px", 
    padding: "20px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "left",
  },
  eventCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#1c2541",
    borderRadius: "8px",
    marginBottom: "20px",
    padding: "10px",
    gap: "15px",
    width: "100%", // Evenimentele nu depășesc conținutul
  },
  eventImage: {
    width: "170px",
    height: "120px",
    borderRadius: "8px",
  },
  eventDetails: {
    display: "flex",
    flexDirection: "column",
  },
  eventTitle: {
    fontSize: "20px",
    margin: "0",
  },
  eventTime: {
    fontSize: "14px",
    color: "#9baec8",
  },
  eventDetailsButton: {
    fontSize: "16px",
    color: "#e63946",
    fontWeight: "bold",
    margin: "5px 0",
  },
  eventLocation: {
    fontSize: "14px",
    color: "#9baec8",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  pageButton: {
    backgroundColor: "#1c2541",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    margin: "0 5px",
    cursor: "pointer",
  },
};

export default Homepage;
