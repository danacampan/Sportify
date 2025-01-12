import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Homepage() {
  const navigate = useNavigate();

  const { eventId } = useParams();
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const eventsPerPage = 3;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/events/');
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Unable to load events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container days-one-regular">
      <div className="content">
        <h1 className="title">Evenimente</h1>
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="eventCard"
            onClick={() => {
              navigate(`/event/${event._id}`, { state: { event } });
            }}
          >
            <img src={event.photo} alt={event.title} className="eventImage" />
            <div className="eventDetails">
              <p className="eventTime">{event.date}</p>
              <h3 className="eventTitle">{event.name}</h3>
              <p className="eventDetailsButton">{event.participants}</p>
              <p className="eventLocation">{event.location}</p>
            </div>
          </div>
        ))}
        <div className="pagination mb-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pageButton ${
                currentPage === index + 1 ? 'activePageButton' : ''
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
