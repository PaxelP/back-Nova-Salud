const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  try {
    const cifrado = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.usuario = cifrado;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no es válido' });
  }
};

module.exports = authMiddleware;
