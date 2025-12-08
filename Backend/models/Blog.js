const { DataTypes } = require('sequelize');
const { sequelize } = require('../config_DB/db.js');

const Blog = sequelize.define('Blog', {
  titulo: DataTypes.STRING,
  slug: DataTypes.STRING,
  contenido: DataTypes.TEXT,
  fecha_publicacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Blog;
