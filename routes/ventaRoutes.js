const express = require('express');
const router = express.Router();
const { registrarVenta, getHistorialVentas } = require('../controllers/ventaController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/ventas:
 *   post:
 *     summary: Registrar una nueva venta y descontar stock
 *     tags: [Ventas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               total:
 *                 type: number
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     cantidad:
 *                       type: integer
 *                     precio:
 *                       type: number
 *     responses:
 *       201:
 *         description: Venta registrada
 */
router.post('/', authMiddleware, registrarVenta);
router.get('/', authMiddleware, getHistorialVentas);

module.exports = router;
