const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si el usuario ya existe
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    // Encriptar password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol
    });

    res.status(201).json({
      msg: 'Usuario creado con éxito',
      usuario: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Verificar password
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    // Generar Token JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      msg: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el login' });
  }
};

module.exports = { register, login };
