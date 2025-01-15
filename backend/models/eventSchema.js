import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
    min: 30,
    max: 300,
  },
  date: {
    type: Date,
    required: true,
  },
  participants: {
    type: [String],
    default: [],
  },
  pendingParticipants: { type: [String] },
  gameType: {
    type: String,
    required: true,
    enum: ['solo', 'echipa'],
  },
  gameMode: {
    type: String,
    required: true,
    enum: ['antrenament', 'competitiv'],
  },
  teams: {
    type: [String],
    default: [],
  },
  organiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
