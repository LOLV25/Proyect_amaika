const Blog = require('../models/Blog');

// Obtener todos los posts
async function getBlogs(req, res) {
  try {
    const blogs = await Blog.findAll({ order: [['fecha_publicacion', 'DESC']] });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener blogs' });
  }
}

// Crear un nuevo post
async function postBlog(req, res) {
  const { titulo, slug, contenido } = req.body;
  if (!titulo || !slug || !contenido) {
    return res.status(400).json({ error: 'Título, slug y contenido son obligatorios' });
  }

  try {
    const nuevo = await Blog.create({ titulo, slug, contenido });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar blog' });
  }
}

// Eliminar un post
async function deleteBlog(req, res) {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ error: 'Blog no encontrado' });

    await blog.destroy();
    res.json({ ok: true, mensaje: 'Blog eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar blog' });
  }
}

module.exports = { getBlogs, postBlog, deleteBlog };
