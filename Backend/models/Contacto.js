const { DataTypes } = require('sequelize');
const { sequelize } = require('../config_DB/db.js');

const Contacto = sequelize.define('Contacto', {
  nombre: DataTypes.STRING,
  email: DataTypes.STRING,
  mensaje: DataTypes.TEXT,
  motivo: DataTypes.STRING,
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Contacto;
