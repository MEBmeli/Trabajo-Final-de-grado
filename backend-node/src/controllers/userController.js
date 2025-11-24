import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

export const createUser = async (req, res) => {
  const { email, password, full_name, role_name } = req.body;

  if (!email || !password || !full_name || !role_name) {
    return res
      .status(400)
      .json({ error: "email, password, full_name y role_name son obligatorios" });
  }

  try {
    // Buscar el rol por nombre
    const roleResult = await pool.query(
      "SELECT id FROM roles WHERE name = $1",
      [role_name]
    );

    if (roleResult.rowCount === 0) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    const roleId = roleResult.rows[0].id;

    // Verificar si ya existe el usuario
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rowCount > 0) {
      return res.status(400).json({ error: "Ya existe un usuario con ese email" });
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    const insertResult = await pool.query(
      `INSERT INTO users (email, password_hash, full_name, role_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, full_name`,
      [email, passwordHash, full_name, roleId]
    );

    const newUser = insertResult.rows[0];

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: newUser,
    });

  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(500).json({ error: "Error interno al crear usuario" });
  }
};

// LISTAR TODOS LOS USUARIOS
export const listUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.email, u.full_name, r.name AS role
       FROM users u
       JOIN roles r ON r.id = u.role_id
       ORDER BY u.id ASC`
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Error listando usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};
