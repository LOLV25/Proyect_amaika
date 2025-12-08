const Resena = require('../models/Reseña');

// Obtener todas las reseñas
async function getResenas(req, res) {
  try {
    const resenas = await Resena.findAll({ order: [['fecha', 'DESC']] });
    res.json(resenas);
  } catch (error) {
    console.error('❌ Error al obtener reseñas:', error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
}

// Crear una nueva reseña
async function postResena(req, res) {
  const { nombre, email, comentario, rating } = req.body;
  if (!nombre || !email || !comentario || !rating) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const nueva = await Resena.create({
      nombre,
      email,
      comentario,
      rating,
      fecha: new Date()
    });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('❌ Error al guardar reseña:', error);
    res.status(500).json({ error: 'Error al guardar reseña' });
  }
}

// Eliminar reseña
async function deleteResena(req, res) {
  const { id } = req.params;
  try {
    const resena = await Resena.findByPk(id);
    if (!resena) return res.status(404).json({ error: 'Reseña no encontrada' });

    await resena.destroy();
    res.json({ ok: true, mensaje: 'Reseña eliminada' });
  } catch (error) {
    console.error('❌ Error al eliminar reseña:', error);
    res.status(500).json({ error: 'Error al eliminar reseña' });
  }
}

module.exports = { getResenas, postResena, deleteResena };
