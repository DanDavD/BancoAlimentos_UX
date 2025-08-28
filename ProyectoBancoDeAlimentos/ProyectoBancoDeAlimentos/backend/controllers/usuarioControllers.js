const { Usuario } = require('../models');
const nodemailer = require('nodemailer');

exports.forgetPassword = async (req, res) => {
    //correo solicitante
    const { correo } = req.body;

  try {
    const user = await Usuario.findOne({ where: { correo } });

    if (!user) {
        return res.status(404).send('Usuario no se pudo encontrar!');
    }

    //codigo de validacion
    const codigo = Math.floor(100000 + Math.random() * 900000);

    //codigo guardado en usuario(temporal)
    user.codigo_confirmacion = codigo; 
    await user.save();

    //configurar nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, //STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //enviar el codigo
    await transporter.sendMail({
      from: `"EasyWay Soporte" <${process.env.EMAIL_USER}>`,
      to: user.correo,
      subject: 'Codigo de confirmación',
      text: 'Tu código de confirmación es: ' + codigo,
    });

    res.send('Código enviado a tu correo');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al enviar el código');
  }
};
