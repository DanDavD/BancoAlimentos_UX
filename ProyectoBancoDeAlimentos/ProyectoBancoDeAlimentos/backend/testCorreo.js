require('dotenv').config();
const nodemailer = require('nodemailer');

async function enviarPrueba() {
  try {
    const codigo = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"EasyWay Soporte" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Prueba Nodemailer',
      text: 'Tu codigo de verificacion es : ' + codigo,
    });

    console.log('Correo enviado correctamente!');
    console.log('ID del mensaje:', info.messageId);
  } catch (err) {
    console.error('Error al enviar el correo:', err);
  }
}

enviarPrueba();
