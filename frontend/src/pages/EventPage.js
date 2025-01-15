import React, { useState, useEffect } from 'react';
import '../index.css';
import { useParams, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

function EventPage() {
  const { id } = useParams();
  const location = useLocation();
  const [currentEvent, setCurrentEvent] = useState(
    location.state?.event || null
  );
  const [votes, setVotes] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [eventStatus, setEventStatus] = useState('Nu a început');

  const formatEventDate = (eventDate) => {
    return format(new Date(eventDate), 'd MMMM yyyy, HH:mm', { locale: ro });
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/event/${id}`
        );
        setCurrentEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (!currentEvent) return;

    const parseEventTime = () => {
      if (!currentEvent?.date || !currentEvent?.duration) {
        setEventStatus('Invalid time data');
        setRemainingTime(0);
        return;
      }

      const eventStart = new Date(currentEvent.date);
      const eventDuration = currentEvent.duration * 60 * 1000;
      const eventEnd = new Date(eventStart.getTime() + eventDuration);

      const now = new Date();

      if (now < eventStart) {
        setEventStatus('Meciul inca nu a început');
        setRemainingTime((eventStart - now) / 1000);
      } else if (now >= eventStart && now < eventEnd) {
        setEventStatus('În desfășurare');
        setRemainingTime((eventEnd - now) / 1000);
      } else {
        setEventStatus('Meci terminat');
        setRemainingTime(0);
      }
    };

    parseEventTime();

    const timer = setInterval(() => {
      parseEventTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [currentEvent]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVote = (option) => {
    if (selectedOption === option) {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [option]: prevVotes[option] - 1,
      }));
      setSelectedOption(null);
    } else {
      if (selectedOption) {
        setVotes((prevVotes) => ({
          ...prevVotes,
          [selectedOption]: prevVotes[selectedOption] - 1,
        }));
      }
      setVotes((prevVotes) => ({
        ...prevVotes,
        [option]: (prevVotes[option] || 0) + 1,
      }));
      setSelectedOption(option);
    }
  };

  if (!currentEvent) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="eventPage days-one-regular">
      <Row>
        <Col>
          <div className="eventDetailsContainer">
            <img
              src={currentEvent.photo}
              alt={currentEvent.name}
              className="eventImageLarge"
            />
          </div>
        </Col>
        <Col className="eventDetailsContainer eventDetails">
          <p className="eventTime">{formatEventDate(currentEvent.date)}</p>
          <h2 className="eventTitle">{currentEvent.name}</h2>
          <p className="eventDetails">{currentEvent.details}</p>
          <p className="eventLocation">{currentEvent.location}</p>

          <p className="pollQuestion mt-3">
            {eventStatus === 'În desfășurare' && remainingTime > 0
              ? `Timp rămas: ${formatTime(remainingTime)}`
              : `Timp ramas: ${eventStatus}`}
          </p>

          <p className="pollQuestion mt-3">
            {currentEvent.gameType === 'echipa'
              ? 'Ce echipa crezi ca va castiga?'
              : 'Cine va castiga în competitia solo?'}
          </p>

          <div className="pollButtons">
            {(() => {
              try {
                const options =
                  currentEvent.gameType === 'echipa'
                    ? JSON.parse(currentEvent.teams)
                    : JSON.parse(currentEvent.participants);

                return options.map((option, index) => (
                  <button
                    key={index}
                    className={`pollButton ${
                      selectedOption === option ? 'selected' : ''
                    }`}
                    onClick={() => handleVote(option)}
                  >
                    {option} ({votes[option] || 0})
                  </button>
                ));
              } catch (error) {
                console.error('Error parsing options:', error);
                return <p>Invalid data for voting options</p>;
              }
            })()}
          </div>
          <button className="buyButton">Bilete</button>
        </Col>
      </Row>
    </div>
  );
}

export default EventPage;
