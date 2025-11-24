// backend-node/src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = "super_secreto_para_tfg_2025";

// Middleware que valida el token
export const authRequired = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Token requerido" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contiene id, email, role, full_name
    next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

// Middleware que exige rol ADMIN
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Solo ADMIN puede hacer esto" });
  }
  next();
};

// Generador de tokens
export const signToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
    },
    JWT_SECRET,
    { expiresIn: "8h" }
  );
};
