const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db');
const setupSwagger = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Documentación Swagger
setupSwagger(app);

// Conexión a DB
connectDB();

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/ventas', require('./routes/ventaRoutes'));

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('💊 FarmaPlus Sync API está en línea');
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📄 Documentación disponible en http://localhost:${PORT}/api-docs`);
});
