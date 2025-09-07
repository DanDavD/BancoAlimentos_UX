const { promocion} = require("../models");


exports.listar = async (req, res) => {
    try {
        const promos = await promocion.findAll({
        where: { activa: true },
        order: [['fecha_inicio', 'DESC']]
        });
        res.json(promos)
    } catch (error) {
        console.error('Error solicitando categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

