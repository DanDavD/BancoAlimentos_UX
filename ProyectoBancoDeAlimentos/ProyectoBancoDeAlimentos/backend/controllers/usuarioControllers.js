const { Usuario } = require('../models');
const nodemailer = require('nodemailer');

const codes = {};

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
    codes[correo] = codigo;

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

exports.validarCodigo = async (req, res) => {
  const { correo, codigo } = req.body;

  const codigo_verificar = codes[correo];

  try {
    const user = await Usuario.findOne({ where: { correo } });

    if (!user) {
      return res.status(404).send('Usuario no encontrado!');
    }

    if (codigo_verificar === parseInt(codigo)) {
      return res.send('Codigo valido!');
    } else {
      return res.status(400).send('Codigo incorrecto!');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error, no se pudo validar el codigo');
  }
};
