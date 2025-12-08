const { DataTypes } = require('sequelize');
const { sequelize } = require('../config_DB/db.js');

const Reseña = sequelize.define('Reseña', {
  nombre: DataTypes.STRING,
  email: DataTypes.STRING,
  comentario: DataTypes.TEXT,
  rating: DataTypes.INTEGER,
  fecha: DataTypes.DATE
});

module.exports = Reseña;
