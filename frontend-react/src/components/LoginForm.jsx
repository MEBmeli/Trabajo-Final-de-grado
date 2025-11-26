// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Users/melin/TFG MELINA/sistema-adopcion/frontend-react/public/logo.png"; // 

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
    <div style={styles.page}>
      <div style={styles.container}>
        <img src={logo} alt="Logo del sistema" style={styles.logo} />

        <h2 style={styles.title}>Iniciar Sesión</h2>
        <p style={styles.subtitle}></p>

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
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: "0px",
    alignItems: "center",
    background: "#f2f3f4ff", // gris clarito
  },
  container: {
    width: "380px",
    padding: "26px 30px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    borderTop: "6px solid #adb8d0ff", // 
    boxSizing: "border-box",
    textAlign: "center",
  },
  logo: {
    width: "250px",
    marginBottom: "8px",
  },
  title: {
    textAlign: "center",
    marginBottom: "4px",
    fontSize: "1.4rem",
    fontWeight: "600",
    color: "#000000ff", // mg este color para el login
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#9d5787ff",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    textAlign: "left",
    fontSize: "0.85rem",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #010103ff  ",
    marginBottom: "14px",
    fontSize: "0.95rem",
  },
  button: {
    padding: "10px",
    background: "#adb8d0ff", // 
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
};

export default LoginForm;
