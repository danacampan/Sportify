import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Homepage({ onEventSelect }) {
  const navigate = useNavigate();

  const allEvents = [
    { id: 1, image: "meci_fotbal.jpg", title: "Meci fotbal", details: "STEAUA VS DINAMO", time: "10 Noiembrie, 16:00-18:00", location: "Strada Cluj, Nr.1" },
    { id: 2, image: "meci_tenis.jpg", title: "Meci tenis", details: "Pers 1 VS Pers 2", time: "10 Noiembrie, 16:00-18:00", location: "Strada Cluj, Nr.1" },
    { id: 3, image: "meci_hambal.jpg", title: "Meci handbal", details: "Echipa A VS Echipa B", time: "11 Noiembrie, 14:00-16:00", location: "Strada București, Nr.2" },
    { id: 4, image: "meci_baschet.jpg", title: "Meci baschet", details: "Echipa X VS Echipa Y", time: "12 Noiembrie, 17:00-19:00", location: "Strada Timișoara, Nr.3" },
    { id: 5, image: "meci_volei.jpg", title: "Meci volei", details: "Echipa C VS Echipa D", time: "13 Noiembrie, 12:00-14:00", location: "Strada Iași, Nr.4" },
    { id: 6, image: "atletism.jpg", title: "Atletism", details: "Cursa 100m", time: "18 Noiembrie, 09:00-11:00", location: "Strada Brașov, Nr.5" },
  ];

  const eventsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(allEvents.length / eventsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="content">
        <h2 className="title">Evenimente</h2>
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="eventCard"
            onClick={() => {
              onEventSelect(event);
              navigate("/event");
            }}
          >
            <img src={event.image} alt={event.title} className="eventImage" />
            <div className="eventDetails">
              <h3 className="eventTitle">{event.title}</h3>
              <p className="eventTime">{event.time}</p>
              <p className="eventDetailsButton">{event.details}</p>
              <p className="eventLocation">{event.location}</p>
            </div>
          </div>
        ))}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pageButton ${
                currentPage === index + 1 ? "activePageButton" : ""
              }`}
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

export default Homepage;