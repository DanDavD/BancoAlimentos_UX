const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const { historial_cupon, cupon } = require('../models');

exports.allCupones = async (req, res) => {
    try {
        const { id_usuario } = req.body;

        const cuponesUsuario = await historial_cupon.findAll({
            where: { id_usuario },
            include: [
                {
                    model: cupon,
                    as: 'cupon',
                    attributes: ['código', 'descripción', 'activo']
                }
            ],
            order: [['fecha_usado']]
        });

        if (cuponesUsuario.length === 0) {
            return res.status(404).json({ message: 'No se encontraron cupones!' });
        }

        const resultado = [];
        for (const hc of cuponesUsuario) {
            resultado.push({
                codigo: hc.cupon.código,
                descripcion: hc.cupon.descripción,
                activo: hc.cupon.activo,
                fecha_usado: hc.fecha_usado
            });
        }

        return res.json(resultado);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los cupones del usuario' });
    }
};

exports.addCupon = async (req,res) => {
    const {} = req.body;
}