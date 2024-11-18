import React from "react";
import "../index.css"; // Importă stilurile globale

function EventPage({ event }) {
  // Date fallback dacă nu primim event ca prop
  const defaultEvent = {
    image: "/meci_fotbal.jpg", // Imaginea este accesată din folderul public
    title: "Meci fotbal",
    details: "STEAUA VS DINAMO",
    time: "10 Noiembrie, 16:00-17:00",
    location: "Strada Cluj, Nr.1",
  };

  // Folosim evenimentul primit sau fallback
  const currentEvent = event || defaultEvent;

  return (
    <div className="eventPage">
      <div className="eventHeader">
        <h2 className="eventTitle">{currentEvent.title}</h2>
        <p className="eventTime">{currentEvent.time}</p>
        <p className="eventLocation">{currentEvent.location}</p>
      </div>
      <div className="eventDetailsContainer">
        <img src={currentEvent.image} alt={currentEvent.title} className="eventImageLarge" />
        <p className="eventDetails">{currentEvent.details}</p>
      </div>
      <div className="pollSection">
        <p className="pollQuestion">Cine crezi că va câștiga?</p>
        <div className="pollButtons">
          <button className="pollButton">STEAUA</button>
          <button className="pollButton">DINAMO</button>
        </div>
      </div>
      <button className="buyButton">Bilete</button>
    </div>
  );
}

export default EventPage;
