import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

export default function OrganiserDashboard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const eventsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  const organiserId = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${organiserId.userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.response?.data?.message || 'Failed to fetch events');
      }
    };

    fetchEvents();
  }, [organiserId, token]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'd MMMM yyyy, HH:mm', { locale: ro });
  };

  return (
    <Container className="days-one-regular">
      <Row>
        <Col>
          <h2 className="mt-4 mb-4 days-one-regular">Evenimente organizate</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {events.length === 0 ? (
            <p>Se incarca...</p>
          ) : (
            <Row>
              {currentEvents.map((event) => (
                <div
                  key={event.id}
                  className="eventCard days-one-regular"
                  style={{
                    width: '100%',
                    marginBottom: '1rem',
                    marginLeft: '1rem',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                    padding: '1rem',
                  }}
                >
                  <img
                    src={event.photo}
                    alt={event.title}
                    width={200}
                    height={150}
                    style={{ borderRadius: '15px', marginRight: '1rem' }}
                  />
                  <div className="eventDetailsContainer" style={{ flex: 1 }}>
                    <p className="eventTime" style={{ fontSize: '16px' }}>
                      {formatDate(event.date)}
                    </p>
                    <h3 className="eventTitle" style={{ fontSize: '24px' }}>
                      {event.name}
                    </h3>
                    <p
                      className="eventDetailsButton"
                      style={{ fontSize: '14px' }}
                    >
                      {(() => {
                        try {
                          if (event.gameType === 'echipa') {
                            const teamsArray = JSON.parse(event.teams);
                            return teamsArray.length >= 2
                              ? `${teamsArray[0]} VS ${teamsArray[1]}`
                              : teamsArray.join(' VS ');
                          } else {
                            const participantsArray = JSON.parse(
                              event.participants
                            );
                            return participantsArray.length >= 2
                              ? `${participantsArray[0]} VS ${participantsArray[1]}`
                              : participantsArray.join(' VS ');
                          }
                        } catch (error) {
                          console.error('Error parsing data:', error);
                          return 'Invalid data';
                        }
                      })()}
                    </p>
                    <p className="eventLocation" style={{ fontSize: '16px' }}>
                      {event.location}
                    </p>
                    <button
                      className="button"
                      style={{
                        width: '7rem',
                        height: '2rem',
                      }}
                      onClick={() => handleEdit(event._id)}
                    >
                      Editeaza
                    </button>
                  </div>
                </div>
              ))}
            </Row>
          )}
        </Col>
      </Row>
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
    </Container>
  );
}
