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
      {/* Profile Section */}
      <Col
        xs={12}
        lg={4}
        className="days-one-regular"
        style={{ backgroundColor: '#071c22', padding: '2rem' }}
      >
        <img
          src={account.avatar}
          alt={account.name}
          className="avatar"
          style={{ width: '150px', borderRadius: '50%', marginLeft: '3rem' }}
        />
        <p style={{ marginTop: '10px', fontSize: '20px', marginLeft: '2rem' }}>
          {account.name} ({account.age})
        </p>
        <p style={{ marginLeft: '5rem' }}>{account.bibiliography}</p>
        <p style={{ color: '#616161', marginLeft: '3rem' }}>
          {account.location}
        </p>
        <Button
          style={{ marginLeft: '5rem' }}
          className="button"
          variant="light"
        >
          Editeaza
        </Button>
        <hr />
        <p style={{ fontSize: '18px' }}>Sporturi principale</p>
        <div className="sports">
          {account.sports.map((sport) => (
            <Button className="sport" key={sport}>
              {sport}
            </Button>
          ))}
        </div>
        <p style={{ fontSize: '18px', marginTop: '1rem' }}>Statistici</p>
        <div>
          <p>
            <span className="statistic">{account.participations}</span>{' '}
            participari la meciuri
          </p>
          <p>
            <span className="statistic">{account.victories}</span> victorii
          </p>
        </div>

        <p style={{ fontSize: '18px' }}>Performante notabile</p>
        {account.performances.map((performance, index) => (
          <div key={index} className="performance">
            <img src="Vector.png" width={30} height={30} alt="medal" />
            <p>{performance}</p>
          </div>
        ))}
      </Col>

      {/* Events Section */}
      <Col xs={12} lg={8}>
        <h2
          className="title days-one-regular"
          style={{ marginTop: '4rem', marginLeft: '1rem' }}
        >
          Evenimentele mele
        </h2>

        <Form.Select
          className="filter-dropdown days-one-regular textForm"
          style={{ width: '20rem', marginBottom: '2rem', marginLeft: '1rem' }}
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
              src={event.image}
              alt={event.title}
              width={200}
              height={150}
              style={{ borderRadius: '15px', marginRight: '1rem' }}
            />
            <div className="eventDetailsContainer" style={{ flex: 1 }}>
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
