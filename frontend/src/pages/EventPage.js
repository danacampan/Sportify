import React, { useState, useEffect } from 'react';
import '../index.css';
import { useParams, useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

function EventPage() {
  const { id } = useParams();
  const location = useLocation();
  const [currentEvent, setCurrentEvent] = useState(
    location.state?.event || null
  );
  const [votesTeam1, setVotesTeam1] = useState(0);
  const [votesTeam2, setVotesTeam2] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [eventStatus, setEventStatus] = useState('Nu a început');

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
      if (!currentEvent?.time) {
        setEventStatus('Invalid time data');
        setRemainingTime(0);
        return;
      }

      const [date, timeRange] = currentEvent.time.split(', ');
      const [day, month, year] = date.split(' ').map((value, index) => {
        if (index === 0) return parseInt(value, 10);
        if (index === 1) {
          const months = {
            Ianuarie: 0,
            Februarie: 1,
            Martie: 2,
            Aprilie: 3,
            Mai: 4,
            Iunie: 5,
            Iulie: 6,
            August: 7,
            Septembrie: 8,
            Octombrie: 9,
            Noiembrie: 10,
            Decembrie: 11,
          };
          return months[value];
        }
        if (index === 2) return parseInt(value, 10);
        return null;
      });

      const [startTime, endTime] = timeRange.split('-');
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);

      const eventStart = new Date(year, month, day, startHours, startMinutes);
      const eventEnd = new Date(year, month, day, endHours, endMinutes);

      const now = new Date();

      if (now < eventStart) {
        setEventStatus('Meciul inca nu a început');
        setRemainingTime((eventEnd - eventStart) / 1000);
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
      if (option === 'STEAUA') setVotesTeam1(votesTeam1 - 1);
      if (option === 'DINAMO') setVotesTeam2(votesTeam2 - 1);
      setSelectedOption(null);
    } else {
      if (option === 'STEAUA') {
        if (selectedOption === 'DINAMO') setVotesTeam2(votesTeam2 - 1);
        setVotesTeam1(votesTeam1 + 1);
      }
      if (option === 'DINAMO') {
        if (selectedOption === 'STEAUA') setVotesTeam1(votesTeam1 - 1);
        setVotesTeam2(votesTeam2 + 1);
      }
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
              alt={currentEvent.title}
              className="eventImageLarge"
            />
          </div>
        </Col>
        <Col className="eventDetailsContainer eventDetails">
          <p className="eventTime">{currentEvent.time}</p>
          <h2 className="eventTitle">{currentEvent.name}</h2>
          <p className="eventDetails">{currentEvent.details}</p>
          <p className="eventLocation">{currentEvent.location}</p>

          <p className="pollQuestion mt-3">
            {eventStatus === 'În desfășurare' && remainingTime > 0
              ? `Timp rămas: ${formatTime(remainingTime)}`
              : `Timp ramas: ${eventStatus}`}
          </p>

          <p className="pollQuestion mt-3">Cine crezi ca va castiga?</p>
          <div className="pollButtons">
            <button
              className={`pollButton ${
                selectedOption === 'STEAUA' ? 'selected' : ''
              }`}
              onClick={() => handleVote('STEAUA')}
            >
              STEAUA ({votesTeam1})
            </button>
            <button
              className={`pollButton ${
                selectedOption === 'DINAMO' ? 'selected' : ''
              }`}
              onClick={() => handleVote('DINAMO')}
            >
              DINAMO ({votesTeam2})
            </button>
          </div>
          <button className="buyButton">Bilete</button>
        </Col>
      </Row>
    </div>
  );
}

export default EventPage;
