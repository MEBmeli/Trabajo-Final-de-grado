// backend-node/src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

// 🔹 Crear token al iniciar sesión
export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
};

// 🔹 Middleware base: verifica el token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (!token || scheme !== "Bearer") {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Guarda datos del usuario en la request
    next();
  } catch (err) {
    console.error("Error verificando token:", err);
    return res.status(401).json({ error: "Token inválido" });
  }
};

// 🔹 Alias más claro (equivalente a verifyToken)
export const authRequired = verifyToken;

// 🔹 Solo ADMIN puede acceder
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Acceso solo para ADMIN" });
  }
  next();
};

