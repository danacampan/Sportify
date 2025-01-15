import express from 'express';
import mongoose from 'mongoose';
import Event from '../models/eventSchema.js';
import multer from 'multer';
import User from '../models/userSchema.js';
import authMiddleware, { checkRole, sendEmails } from '../utils.js';

const eventRouter = express();

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const upload = multer({
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type must be jpeg, png, or gif.'));
    }
  },
});

eventRouter.get('/', async (req, res) => {
  try {
    const events = await Event.find({ pendingParticipants: { $size: 0 } });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res
      .status(500)
      .json({ message: 'Failed to fetch events', error: error.message });
  }
});

eventRouter.get('/:organiserId', async (req, res) => {
  const { organiserId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(organiserId)) {
    return res.status(400).json({ message: 'Invalid organiser ID format.' });
  }

  try {
    const events = await Event.find({ organiser: organiserId });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching organiser events:', error);
    res.status(500).json({
      message: 'Failed to fetch organiser events',
      error: error.message,
    });
  }
});

eventRouter.get('/event/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Event ID format' });
  }

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Invalid Event ID' });
  }
});

eventRouter.patch('/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const eventData = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const savedEvent = await updatedEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Failed to update event' });
  }
});

eventRouter.get('/my-events', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('events');
    res.status(200).json(user.events);
  } catch (error) {
    res.status(500).json({ message: 'Eroare la încărcarea evenimentelor.' });
  }
});

eventRouter.get('/:eventId/join', async (req, res) => {
  const { eventId } = req.params;
  const { email } = req.query;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Evenimentul nu a fost găsit.' });
    }

    if (!event.pendingParticipants.includes(email)) {
      return res.status(400).json({
        message: 'Nu ai o invitație pendente pentru acest eveniment.',
      });
    }

    event.pendingParticipants = event.pendingParticipants.filter(
      (participant) => participant !== email
    );
    event.participants.push(email);

    await event.save();

    res.status(200).send(`
      <h1>Succes!</h1>
      <p>Te-ai înscris cu succes la evenimentul "${event.name}".</p>
      <a href="http://localhost:3000/events/${eventId}">Înapoi la pagina evenimentului</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'A apărut o eroare.', error: err.message });
  }
});

eventRouter.post(
  '/event',
  authMiddleware,
  upload.single('photo'),
  async (req, res) => {
    try {
      const {
        name,
        location,
        duration,
        date,
        participants,
        gameType,
        gameMode,
        teams,
      } = req.body;

      const user = req.user;
      const organiser = user.userId;
      const photo = req.file;

      if (!photo) {
        return res
          .status(400)
          .json({ message: 'A poster image must be provided.' });
      }

      const newEvent = new Event({
        name,
        location,
        photo: `data:image/jpeg;base64,${photo.buffer.toString('base64')}`,
        duration,
        date,
        participants: [],
        pendingParticipants: JSON.parse(participants),
        gameType,
        gameMode,
        teams,
        organiser,
      });

      const savedEvent = await newEvent.save();
      const populatedEvent = await Event.findById(savedEvent._id).populate(
        'organiser'
      );

      if (participants && participants.length > 0) {
        await sendEmails(JSON.parse(participants), name, populatedEvent._id);
      }

      res
        .status(201)
        .json({ message: 'Event created successfully', event: populatedEvent });
    } catch (err) {
      res
        .status(400)
        .json({ error: 'Failed to create event', message: err.message });
    }
  }
);
export default eventRouter;
