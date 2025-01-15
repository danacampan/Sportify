import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';

export default function EditEvent() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [duration, setDuration] = useState(null);
  const [date, setDate] = useState('');
  const [teams, setTeams] = useState([]);
  const [organiser, setOrganiser] = useState('');
  const [newTeam, setNewTeam] = useState('');
  const { eventId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/api/events/${eventId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const event = response.data;
        setName(event.name || '');
        setLocation(event.location || '');
        setDate(event.date || '');
        setDuration(event.duration || null);
        setOrganiser(event.organiser || '');
      } catch (err) {
        console.error('Error fetching event:', err);
        alert('Nu s-a putut încărca evenimentul.');
      }
    };
    console.log('Event ID:', eventId);
    fetchEvent();
  }, [eventId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    } else {
      setPhoto(null);
    }
  };

  const handleChange = (e) => {
    setDuration(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !photo || !location || !duration || !date) {
      alert('Please fill all required fields.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Trebuie să fii autentificat pentru a edita evenimentul.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('photo', photo);
    formData.append('duration', duration);
    formData.append('date', date);
    formData.append('organiser', user.userId);

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/events/${eventId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Event updated successfully:', response.data);
      alert('Evenimentul a fost actualizat cu succes!');
      navigate('/dashboard');
    } catch (error) {
      console.error(
        'Error updating event:',
        error.response?.data || error.message
      );
      alert('A apărut o eroare la actualizarea evenimentului.');
    }
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
        <h2 className="my-30">Editeaza evenimentul</h2>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Nume eveniment</Form.Label>
            <Form.Control
              type="text"
              className="textForm"
              value={name}
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
              value={location}
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
          <Form.Group className="mb-3">
            <Form.Label>Durata</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  variant="dark"
                  type="number"
                  value={duration || ''}
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
