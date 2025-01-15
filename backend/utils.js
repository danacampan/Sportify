import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'petadopt38@gmail.com',
    pass: 'xqvy mudu zcok moie',
  },
});

export const sendEmails = async (participants, eventName, eventId) => {
  const emails = participants.map((participant) => ({
    from: 'petadopt38@gmail.com',
    to: participant,
    subject: `Invitație la eveniment: ${eventName}`,
    html: ` <p>Ai fost invitat să participi la evenimentul <b>${eventName}</b>.</p>
      <p>Poți, de asemenea, să accepți invitația direct:</p>
      <a href="http://localhost:5000/api/events/${eventId}/join?email=${encodeURIComponent(
      participant
    )}" 
         style="display: inline-block; padding: 10px 15px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
        Acceptă invitația
      </a>`,
  }));

  for (const email of emails) {
    await transporter.sendMail(email);
  }
};

export const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Acces interzis.' });
  }
  next();
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token invalid.' });
  }
};

export default authMiddleware;
