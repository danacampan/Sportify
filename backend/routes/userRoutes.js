import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userSchema.js';
import authMiddleware from '../utils.js';
dotenv.config();

const userRouter = express();

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

userRouter.get('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL
    const user = await User.findById(userId); // Find the user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's data (you can modify this based on what fields you need)
    return res.status(200).json({
      userId: user._id,
      username: user.nume,
      email: user.email,
      dateOfBirth: user.dataNasterii,
      role: user.rol,
      avatar: user.avatar,
      bio: user.bibliografie,
      location: user.locatie,
      sports: user.sporturiPrincipale,
      stats: user.statistici,
      performances: user.performanteNotabile,
      // Add any other fields you want to return from the user object
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

userRouter.post('/register', async (req, res) => {
  try {
    const { username, password, email, dateOfBirth, role } = req.body;

    if (!username || !password || !email || !dateOfBirth) {
      return res
        .status(400)
        .json({ message: 'Toate câmpurile sunt obligatorii.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email-ul este deja folosit.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const newUser = new User({
        nume: username,
        email,
        dataNasterii: dateOfBirth,
        parola: hashedPassword,
        rol: role,
      });

      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: 'A apărut o eroare la înregistrare.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'A apărut o eroare.' });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordmatch = await bcrypt.compare(password, user.parola);
    if (!passwordmatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      token,
      user: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

userRouter.delete('/:id', authMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.send({ message: 'Utilizator sters' });
  } else {
    res.status(404).send({ message: 'Utilizator negasit' });
  }
});

export default userRouter;
