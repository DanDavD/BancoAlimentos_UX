// Controller para gestionar métodos de pago
const { metodo_pago } = require("../models");

// Obtener todos los métodos de pago de un usuario
exports.getAllMetodosDePago = async (req, res) => {
  try {
    // Suponiendo que el id del usuario viene en req.user.id
    const metodos = await metodo_pago.findAll({
      where: { id_usuario: req.user.id },
    });
    res.json(metodos);
    if (!metodos.length) {
      return res
        .status(404)
        .json({ error: "No se encontraron métodos de pago" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener métodos de pago" });
  }
};

// Crear un nuevo método de pago
exports.createNuevoMetodoPago = async (req, res) => {
  try {
    const nuevo = await metodo_pago.create({
      ...req.body,
      id_usuario: req.user.id,
      fecha_creacion: new Date(),
    });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: "Error al crear método de pago" });
  }
};

// Eliminar un método de pago
exports.deleteMetodoPago = async (req, res) => {
  try {
    const deleted = await metodo_pago.destroy({
      where: { id_metodo_pago: req.params.id, id_usuario: req.user.id },
    });
    if (deleted) {
      res.json({ message: "Método de pago eliminado" });
    } else {
      res.status(404).json({ error: "Método de pago no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar método de pago" });
  }
};

// Establecer un método de pago como predeterminado
exports.establecerComoDefault = async (req, res) => {
  try {
    // Primero, desmarcar todos los métodos como predeterminado
    await metodo_pago.update(
      { metodo_predeterminado: false },
      { where: { id_usuario: req.user.id } }
    );
    // Luego, marcar el seleccionado como predeterminado
    await metodo_pago.update(
      { metodo_predeterminado: true },
      { where: { id_metodo_pago: req.params.id, id_usuario: req.user.id } }
    );
    res.json({ message: "Método de pago predeterminado actualizado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar método predeterminado" });
  }
};
