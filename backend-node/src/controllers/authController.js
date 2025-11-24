// backend-node/src/controllers/authController.js
import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import { signToken } from "../middleware/authMiddleware.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    // Busca usuario + rol
    const result = await pool.query(
      `SELECT u.id, u.email, u.password_hash, u.full_name, r.name AS role
       FROM users u
       JOIN roles r ON r.id = u.role_id
       WHERE u.email = $1`,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = result.rows[0];

    // Compara contraseña
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Arma objeto sin password
    const safeUser = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    };

    // Crea token
    const token = signToken(safeUser);

    res.json({
      message: "Login exitoso",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno en el login" });
  }
};
