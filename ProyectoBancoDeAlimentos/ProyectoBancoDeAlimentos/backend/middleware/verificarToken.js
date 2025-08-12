const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  console.log("🔍 req.headers.authorization:", req.headers.authorization);
console.log("🔍 Todos los headers:", req.headers);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("❌ No hay token en los headers");
    return res.status(401).json({ message: 'No autenticado' });
  }

  const token = authHeader.split(' ')[1];
  console.log("✅ Token recibido:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
    req.user = decoded;
    console.log("✅ Usuario autenticado:", decoded);
    next();
  } catch (error) {
    console.error("❌ Error al verificar token:", error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = verificarToken;
