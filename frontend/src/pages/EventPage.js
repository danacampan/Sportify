import React, { useState } from 'react';
import '../index.css';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

function EventPage() {
  const location = useLocation();
  const currentEvent = location.state?.event || {
    image: '/meci_fotbal.jpg',
    title: 'Meci fotbal',
    details: 'STEAUA VS DINAMO',
    time: '10 Noiembrie, 16:00-17:00',
    location: 'Strada Cluj, Nr.1',
  };

  const [votesTeam1, setVotesTeam1] = useState(0);
  const [votesTeam2, setVotesTeam2] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

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

  return (
    <div className="eventPage days-one-regular">
      <Row>
        <Col>
          <div className="eventDetailsContainer">
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="eventImageLarge"
            />
          </div>
        </Col>
        <Col className="eventDetailsContainer eventDetails">
          <p className="eventTime">{currentEvent.time}</p>
          <h2 className="eventTitle">{currentEvent.title}</h2>
          <p className="eventDetails">{currentEvent.details}</p>
          <p className="eventLocation">{currentEvent.location}</p>
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
