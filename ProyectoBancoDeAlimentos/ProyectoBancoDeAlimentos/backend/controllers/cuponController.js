const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const { historial_cupon, cupon } = require("../models");
const { Op, fn, col } = require("sequelize");

exports.allCupones = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const cuponesUsuario = await historial_cupon.findAll({
      where: { id_usuario },
      include: [
        {
          model: cupon,
          as: "cupon",
          attributes: ["codigo", "descripcion", "activo"], // usar sin tildes
        },
      ],
      order: [["fecha_usado"]],
    });

    if (cuponesUsuario.length === 0) {
      return res.status(404).json({ message: "No se encontraron cupones!" });
    }

    const resultado = cuponesUsuario.map((hc) => ({
      codigo: hc.cupon.codigo, // sin tilde
      descripcion: hc.cupon.descripcion, // sin tilde
      activo: hc.cupon.activo,
      fecha_usado: hc.fecha_usado,
    }));

    return res.json(resultado);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener los cupones del usuario" });
  }
};

exports.addCupon = async (req, res) => {
  const { codigo, descripcion, tipo, valor, uso_por_usuario, termina_en, activo } = req.body;

  try {
    // Verificar si ya existe un cupón con el mismo código
    const cuponExistente = await cupon.findOne({ where: { codigo } });
    if (cuponExistente) {
      return res.status(400).json({ message: 'Ya existe un cupón con ese código' });
    }

    // Crear nuevo cupón
    const nuevoCupon = await cupon.create({
      codigo,
      descripcion,
      tipo,        // nuevo
      valor,       // nuevo
      uso_por_usuario,
      termina_en,  // nuevo
      activo: activo !== undefined ? activo : true
    });

    return res.status(201).json({
      message: 'Cupón agregado correctamente',
      cupon: nuevoCupon
    });
  } catch (error) {
    console.error('Error agregando cupón:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.getAllCupones = async (req, res) => {
  try {
    // Traer todos los cupones
    const cupones = await cupon.findAll({
      attributes: [
        "id_cupon",
        "codigo",
        "descripcion",
        "tipo",
        "valor",
        "uso_por_usuario",
        "termina_en",
        "activo",
        // Subquery para contar cuántas veces se ha usado cada cupón
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM historial_cupon AS h
            WHERE h.id_cupon = cupon.id_cupon
          )`),
          "usos_actuales",
        ],
      ],
      order: [["id_cupon", "ASC"]],
    });

    if (!cupones || cupones.length === 0) {
      return res.status(404).json({ message: "No se encontraron cupones." });
    }

    const resultado = cupones.map((c) => {
      const ahora = new Date();
      const fechaExpiracion = new Date(c.termina_en);
      const usosActuales = parseInt(c.dataValues.usos_actuales) || 0;

      let estado = "activo";
      if (!c.activo) estado = "inactivo";
      else if (fechaExpiracion < ahora) estado = "expirado";
      else if (usosActuales >= c.uso_por_usuario) estado = "usado";

      return {
        id_cupon: c.id_cupon,
        codigo: c.codigo,
        descripcion: c.descripcion,
        tipo: c.tipo,
        valor: c.valor,
        uso_maximo_por_usuario: c.uso_por_usuario,
        usos_actuales: usosActuales,
        fecha_expiracion: c.termina_en,
        activo: c.activo,
        estado,
      };
    });

    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener cupones." });
  }
};
