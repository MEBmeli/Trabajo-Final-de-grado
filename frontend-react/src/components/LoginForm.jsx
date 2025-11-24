// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (onLoginSuccess) onLoginSuccess(data.user);

        setMessage("✅ Login exitoso");
        // Redirigir al dashboard
        navigate("/", { replace: true });
      } else {
        setMessage(`❌ ${data.error || "Error al iniciar sesión"}`);
      }
    } catch (err) {
      setMessage("❌ Error de conexión con el servidor");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "420px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    background: "#fff",
  },
  title: { textAlign: "center", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column" },
  label: { fontWeight: "bold", marginBottom: "5px" },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #aaa",
    marginBottom: "15px",
  },
  button: {
    padding: "10px",
    background: "#0066ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default LoginForm;
