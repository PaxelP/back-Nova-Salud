const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Venta = require('./Venta');
const DetalleVenta = require('./DetalleVenta');

// Asociaciones
Venta.hasMany(DetalleVenta, { foreignKey: 'venta_id', as: 'detalles' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'venta_id' });

Producto.hasMany(DetalleVenta, { foreignKey: 'producto_id' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'producto_id' });

Venta.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = {
  Usuario,
  Producto,
  Venta,
  DetalleVenta
};
