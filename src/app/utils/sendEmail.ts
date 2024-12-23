import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: 'rabby.webdeveloper@gmail.com',
      pass: 'rjsu rsru lijr sqxx',
    },
  });

  await transporter.sendMail({
    from: 'rabby.webdeveloper@gmail.com', // sender address
    to, // list of receivers
    subject:
      'We received a request to reset your password. Click the link below to reset it within 10 minutes', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
