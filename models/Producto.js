const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock_actual: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  stock_minimo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5
  },
  codigo_barras: {
    type: DataTypes.STRING(50),
    unique: true
  }
}, {
  tableName: 'productos',
  timestamps: false
});

module.exports = Producto;
