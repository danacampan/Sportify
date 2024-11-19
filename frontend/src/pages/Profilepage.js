import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function Profilepage() {
  const [selectedRole, setSelectedRole] = useState('All');

  const allEvents = [
    {
      id: 1,
      image: 'meci_fotbal.jpg',
      title: 'Meci fotbal',
      details: 'STEAUA VS DINAMO',
      time: '10 Noiembrie, 16:00-18:00',
      location: 'Strada Cluj, Nr.1',
      role: 'Participant',
    },
    {
      id: 2,
      image: 'meci_tenis.jpg',
      title: 'Meci tenis',
      details: 'Pers 1 VS Pers 2',
      time: '10 Noiembrie, 16:00-18:00',
      location: 'Strada Cluj, Nr.1',
      role: 'Spectator',
    },
    {
      id: 3,
      image: 'meci_hambal.jpg',
      title: 'Meci handbal',
      details: 'Echipa A VS Echipa B',
      time: '11 Noiembrie, 14:00-16:00',
      location: 'Strada București, Nr.2',
      role: 'Participant',
    },
  ];

  const account = {
    avatar: 'fata.jpeg',
    name: 'Campan Dana',
    age: 20,
    bibiliography: 'Just do it',
    location: 'Timisoara, Timis',
    sports: ['TENIS', 'BADMINTON'],
    participations: 15,
    victories: 10,
    performances: ['Locul 1 intr-un turneu regional', 'Jucatorul lunii'],
  };

  const filteredEvents =
    selectedRole === 'All'
      ? allEvents
      : allEvents.filter((event) => event.role === selectedRole);

  return (
    <Row className="profile-container">
      <Col className="days-one-regular" style={{ backgroundColor: '#071c22' }}>
        <img src={account.avatar} alt={account.name} className="avatar" />
        <p style={{ marginLeft: '4rem', marginTop: '10px', fontSize: '20px' }}>
          {account.name} ({account.age})
        </p>
        <p style={{ marginLeft: '7rem' }}>{account.bibiliography}</p>
        <p style={{ marginLeft: '5rem', color: '#616161' }}>
          {account.location}
        </p>
        <Button style={{ marginLeft: '6rem' }} className="button">
          Editeaza
        </Button>
        <hr />
        <p style={{ marginLeft: '1rem', fontSize: '18px' }}>
          Sporturi principale
        </p>
        <div className="sports">
          {account.sports.map((sport) => (
            <Button className="sport">{sport}</Button>
          ))}
        </div>
        <p style={{ marginLeft: '1rem', fontSize: '18px', marginTop: '1rem' }}>
          Statistici
        </p>
        <div>
          <p>
            <span className="statistic">{account.participations}</span>{' '}
            participari la meciuri
          </p>
          <p>
            <span className="statistic">{account.victories}</span> victorii
          </p>
        </div>

        <p style={{ marginLeft: '1rem', fontSize: '18px' }}>
          Performante notabile
        </p>
        {account.performances.map((performance) => (
          <div className="performance">
            <img src="Vector.png" width={30} height={30} alt="medal" />
            <p>{performance}</p>
          </div>
        ))}
      </Col>
      <Col>
        <h2
          className="title days-one-regular"
          style={{ marginLeft: '4rem', marginTop: '4rem' }}
        >
          Evenimentele mele
        </h2>

        <Form.Select
          className="filter-dropdown days-one-regular textForm"
          style={{ width: '20rem', marginLeft: '4rem', marginBottom: '2rem' }}
          onChange={(e) => setSelectedRole(e.target.value)}
          value={selectedRole}
        >
          <option value="All">Toate</option>
          <option value="Participant">Participant</option>
          <option value="Spectator">Spectator</option>
        </Form.Select>

        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="eventCard days-one-regular"
            style={{ width: '50rem', marginLeft: '3rem' }}
          >
            <img
              src={event.image}
              alt={event.title}
              width={200}
              height={150}
              style={{ borderRadius: '15px' }}
            />
            <div className="eventDetailsContainer">
              <p className="eventTime" style={{ fontSize: '16px' }}>
                {event.time}
              </p>
              <h3 className="eventTitle" style={{ fontSize: '24px' }}>
                {event.title}
              </h3>
              <p className="eventDetailsButton" style={{ fontSize: '14px' }}>
                {event.details}
              </p>
              <p className="eventLocation" style={{ fontSize: '16px' }}>
                {event.location}
              </p>
            </div>
          </div>
        ))}
      </Col>
    </Row>
  );
}
