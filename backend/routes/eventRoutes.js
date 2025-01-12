import express from 'express';
import mongoose from 'mongoose';
import Event from '../models/eventSchema.js';
import multer from 'multer';

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
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch events', message: err.message });
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

eventRouter.post('/event', upload.single('photo'), async (req, res) => {
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
      participants,
      gameType,
      gameMode,
      teams,
    });

    const savedEvent = await newEvent.save();

    res
      .status(201)
      .json({ message: 'Event created successfully', event: savedEvent });
  } catch (err) {
    res
      .status(400)
      .json({ error: 'Failed to create event', message: err.message });
  }
});
export default eventRouter;
