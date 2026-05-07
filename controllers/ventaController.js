const { sequelize } = require('../config/db');
const { Venta, DetalleVenta, Producto } = require('../models');

const registrarVenta = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { usuario_id, total, productos } = req.body; // productos: [{id, cantidad, precio}]

    // 1. Crear la Venta
    const nuevaVenta = await Venta.create({
      usuario_id,
      total
    }, { transaction: t });

    // 2. Procesar cada producto
    for (const item of productos) {
      const producto = await Producto.findByPk(item.id, { transaction: t });

      if (!producto || producto.stock_actual < item.cantidad) {
        throw new Error(`Stock insuficiente para el producto: ${producto ? producto.nombre : 'Desconocido'}`);
      }

      // Descontar stock
      await producto.update({
        stock_actual: producto.stock_actual - item.cantidad
      }, { transaction: t });

      // Crear detalle
      await DetalleVenta.create({
        venta_id: nuevaVenta.id,
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.cantidad * item.precio
      }, { transaction: t });
    }

    await t.commit();
    res.status(201).json({ msg: 'Venta registrada con éxito', ventaId: nuevaVenta.id });

  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(400).json({ msg: error.message || 'Error al registrar la venta' });
  }
};

const getHistorialVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll({ 
            order: [['fecha', 'DESC']],
            include: [{
                model: DetalleVenta,
                as: 'detalles',
                include: [Producto]
            }]
        });
        res.json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener historial' });
    }
};

module.exports = { registrarVenta, getHistorialVentas };
