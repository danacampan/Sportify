import { useState } from 'react';
import { Form, Row, Col, Button, ListGroup } from 'react-bootstrap';

export default function AddEvent() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [duration, setDuration] = useState(null);
  const [date, setDate] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [gameType, setGameType] = useState('solo');
  const [gameMode, setGameMode] = useState('antrenament');
  const [newParticipant, setNewParticipant] = useState('');
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
    setPhoto(file);
  };

  const handleChange = (e) => {
    setDuration(Number(e.target.value));
  };

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
    }
  };

  const deleteParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const addTeam = () => {
    if (newTeam.trim()) {
      setTeams([...teams, newTeam]);
      setNewTeam('');
    }
  };

  const deleteTeam = (index) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="form-container days-one-regular px-4 py-4">
        <h2 className="my-30">Adauga un eveniment</h2>
        <br />
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Nume eveniment</Form.Label>
            <Form.Control
              type="text"
              className="textForm"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="photos">
            <Form.Label>Alege imagine</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              className="photoForm textForm"
              onChange={(e) => handleFileChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Adresa</Form.Label>
            <Form.Control
              type="text"
              className="textForm"
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="datetimeInput" className="mb-3">
            <Form.Label>Data si ora</Form.Label>
            <Form.Control
              type="datetime-local"
              className="textForm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 ">
            <Form.Label>Durata</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  variant="dark"
                  type="number"
                  value={duration}
                  onChange={handleChange}
                  className="spinner dropdownForm"
                  min="30"
                  max="300"
                  step="5"
                />
              </Col>
              <Col>
                <p style={{ marginLeft: '-140px', marginTop: '5px' }}>minute</p>
              </Col>
            </Row>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Tipul meciului</Form.Label>
                <Row>
                  <Col>
                    <Form.Select
                      aria-label="Dropdown clasic"
                      className="dropdownForm"
                      onChange={(e) => setGameType(e.target.value)}
                    >
                      <option value="solo">Solo</option>
                      <option value="echipa">Echipa</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Select
                      aria-label="Dropdown clasic"
                      className="dropdownForm"
                      onChange={(e) => setGameMode(e.target.value)}
                    >
                      <option value="antrenament">Antrenament</option>
                      <option value="competitiv">Competitiv</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          {gameType === 'solo' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Adauga participant</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      className="textForm"
                      value={newParticipant}
                      onChange={(e) => setNewParticipant(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button
                      onClick={addParticipant}
                      className="button"
                      variant="dark"
                    >
                      Adauga
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <ListGroup className="mb-3">
                {participants.map((participant, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between participants align-items-center"
                  >
                    {participant}
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => deleteParticipant(index)}
                    >
                      ✕
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}

          {gameType === 'echipa' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Adauga echipa</Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      className="textForm"
                      value={newTeam}
                      onChange={(e) => setNewTeam(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button onClick={addTeam} className="button" variant="dark">
                      Adauga
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <ListGroup className="mb-3">
                {teams.map((team, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between participants align-items-center"
                  >
                    {team}

                    <Button
                      className="delete-btn"
                      size="sm"
                      onClick={() => deleteTeam(index)}
                    >
                      ✕
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}

          <Button
            type="submit"
            className="button"
            variant="dark"
            style={{
              display: 'block',
              justifyContent: 'center',
              maxWidth: '13em',
              height: '40px',
            }}
          >
            Salveaza
          </Button>
        </Form>
      </div>
    </div>
  );
}
