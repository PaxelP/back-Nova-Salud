const express = require('express');
const router = express.Router();
const { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } = require('../controllers/productoController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', getProductos);

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del producto
 */
router.get('/:id', getProductoById);

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto (Requiere Token)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock_actual:
 *                 type: integer
 *               codigo_barras:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/', authMiddleware, createProducto);

// ... similares para update y delete
router.put('/:id', authMiddleware, updateProducto);
router.delete('/:id', authMiddleware, deleteProducto);

module.exports = router;
