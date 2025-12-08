const Contacto = require('../models/Contacto');

// obtiene todos los mensajes de contacto
async function getContactos(req, res) {
  try {
    const contactos = await Contacto.findAll({ order: [['fecha', 'DESC']] });
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
}

// crea un nuevo mensaje de contacto
async function postContacto(req, res) {
  const { nombre, email, mensaje, motivo } = req.body;
  if (!nombre || !email || !mensaje || !motivo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevo = await Contacto.create({ nombre, email, mensaje, motivo });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar contacto' });
  }
}

// elimina un mensaje de contacto
async function deleteContacto(req, res) {
  const { id } = req.params;
  try {
    const contacto = await Contacto.findByPk(id);
    if (!contacto) return res.status(404).json({ error: 'Contacto no encontrado' });

    await contacto.destroy();
    res.json({ ok: true, mensaje: 'Contacto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar contacto' });
  }
}

module.exports = { getContactos, postContacto, deleteContacto };
