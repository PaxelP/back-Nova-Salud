const Producto = require('../models/Producto');

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener productos' });
  }
};

const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el producto' });
  }
};

const createProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear producto' });
  }
};

const updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
    
    await producto.update(req.body);
    res.json({ msg: 'Producto actualizado', producto });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar producto' });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
    
    await producto.destroy();
    res.json({ msg: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar producto' });
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
