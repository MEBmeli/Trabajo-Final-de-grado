import express from "express";
import cors from "cors";
import { pool } from "./config/db.js";
import authRoutes from "./routers/authRoutes.js";
import userRoutes from "./routers/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Sistema de Adopción funcionando ✅");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ ok: true, now: result.rows[0] });
  } catch (error) {
    console.error("Error conectando a la BD:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
