import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [selectedRole, setSelectedRole] = useState('All');
  const [newSport, setNewSport] = useState('');

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
  ];

  const filteredEvents =
    selectedRole === 'All'
      ? allEvents
      : allEvents.filter((event) => event.role === selectedRole);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(localStorage.getItem('user'))?.userId;

        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditedProfile({
      ...profile,
      sports: profile.sports || [],
    });
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'avatar' && files && files.length) {
      const reader = new FileReader();
      reader.onload = () =>
        setEditedProfile({ ...editedProfile, avatar: reader.result });
      reader.readAsDataURL(files[0]);
    } else {
      setEditedProfile({ ...editedProfile, [name]: value });
    }
  };

  const handleAddSport = () => {
    if (newSport.trim() && !editedProfile.sports.includes(newSport)) {
      setEditedProfile({
        ...editedProfile,
        sports: [...editedProfile.sports, newSport.trim()],
      });
      setNewSport('');
    }
  };

  const handleRemoveSport = (sport) => {
    setEditedProfile({
      ...editedProfile,
      sports: editedProfile.sports.filter((s) => s !== sport),
    });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = JSON.parse(localStorage.getItem('user'))?.userId;

      // Salvăm modificările
      await axios.patch(
        `http://localhost:5000/api/users/${userId}`,
        editedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile({
        ...editedProfile,
        avatar: editedProfile.avatar || profile.avatar,
      });

      setShowModal(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  if (!profile) {
    return <p>Se încarcă...</p>;
  }

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
          src={profile.avatar || 'default-avatar.png'}
          alt={profile.name || 'Profil'}
          className="avatar"
          style={{ width: '130px', borderRadius: '50%', marginLeft: '4.3rem' }}
        />
        <p style={{ marginTop: '10px', fontSize: '20px', marginLeft: '2rem' }}>
          {profile.username || 'Nume necompletat'} (
          {profile.age || 'Nespecificat'})
        </p>
        <p style={{ marginLeft: '4rem' }}>
          {profile.bio || 'Nu ai setat inca o descriere'}
        </p>
        <p style={{ color: '#616161', marginLeft: '3rem' }}>
          {profile.location || 'Locatie nespecificata'}
        </p>
        <Button
          style={{ marginLeft: '5rem' }}
          className="button"
          variant="light"
          onClick={handleEditClick}
        >
          Editeaza
        </Button>
        <hr />
        <p style={{ fontSize: '18px' }}>Sporturi principale</p>
        <div className="sports">
          {profile.sports?.length > 0
            ? profile.sports.map((sport) => (
                <Button className="sport" key={sport}>
                  {sport}
                </Button>
              ))
            : 'Nu ai setat inca sporturi principale'}
        </div>
        <p style={{ fontSize: '18px', marginTop: '1rem' }}>Statistici</p>
        <div>
          <p>
            <span className="statistic">
              {profile.stats?.participations || 0}
            </span>{' '}
            participari la meciuri
          </p>
          <p>
            <span className="statistic">{profile.stats?.victories || 0}</span>{' '}
            victorii
          </p>
        </div>

        <p style={{ fontSize: '18px' }}>Performante notabile</p>
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

      {/* Edit Profile Modal */}
      <Modal
        show={showModal}
        className="modal"
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editează Profilul</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Nume</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editedProfile.username || ''}
                onChange={handleModalChange}
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Vârstă</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={editedProfile.age || ''}
                onChange={handleModalChange}
              />
            </Form.Group>
            <Form.Group controlId="formAvatar">
              <Form.Label>Avatar (URL)</Form.Label>
              <Form.Control
                type="text"
                name="avatar"
                value={editedProfile.avatar || ''}
                onChange={handleModalChange}
              />
            </Form.Group>
            <Form.Group controlId="formBio">
              <Form.Label>Descriere</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                value={editedProfile.bio || ''}
                onChange={handleModalChange}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Locație</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={editedProfile.location || ''}
                onChange={handleModalChange}
              />
            </Form.Group>
            <Form.Group controlId="formSports">
              <Form.Label>Sporturi</Form.Label>
              <div>
                {editedProfile.sports?.map((sport) => (
                  <Button
                    key={sport}
                    variant="danger"
                    onClick={() => handleRemoveSport(sport)}
                  >
                    {sport} ✕
                  </Button>
                ))}
              </div>
              <Form.Control
                type="text"
                placeholder="Adaugă sporturi"
                value={newSport}
                onChange={(e) => setNewSport(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSport()}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anulează
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salvează Modificările
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
