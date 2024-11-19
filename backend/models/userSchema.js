import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nume: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    parola: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    dataNasterii: {
      type: Date,
      required: true,
    },
    rol: {
      type: String,
      enum: ['organizer', 'user'],
      required: true,
    },

    bibliografie: {
      type: String,
      default: '',
    },
    locatie: {
      type: String,
      default: '',
    },
    sporturiPrincipale: {
      type: [String],
      default: [],
    },
    statistici: {
      participari: {
        type: Number,
        default: 0,
      },
      victorii: {
        type: Number,
        default: 0,
      },
    },
    performanteNotabile: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
