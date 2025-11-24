// src/components/MainDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

function MainDashboard({ user, onLogout }) {
  const modules = [
    { path: "/ia", label: "Módulo de IA", description: "Sugerencias y análisis inteligente." },
    { path: "/expedientes", label: "Expedientes", description: "Gestión de expedientes de adopción." },
    { path: "/familias", label: "Familias", description: "Seguimiento de familias postulantes." },
    { path: "/hogares", label: "Hogares", description: "Gestión de hogares convivenciales." },
    { path: "/informes", label: "Informes", description: "Carga y consulta de informes." },
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1>Sistema de Adopción</h1>
          {user && (
            <p>
              Sesión iniciada como <strong>{user.full_name}</strong> ({user.role})
            </p>
          )}
        </div>
        <button style={styles.logout} onClick={onLogout}>
          Cerrar sesión
        </button>
      </header>

      <main style={styles.main}>
        <h2 style={styles.subtitle}>Módulos principales</h2>
        <div style={styles.grid}>
          {modules.map((mod) => (
            <Link key={mod.path} to={mod.path} style={styles.card}>
              <h3>{mod.label}</h3>
              <p>{mod.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

 const styles = {
  page: {
    background: "#fff",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logout: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    background: "#cc0000",
    color: "#fff",
    cursor: "pointer",
  },

  subtitle: {
    marginBottom: "15px",
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    justifyItems: "center",
  },

  card: {
    width: "180px",
    padding: "15px",
    textAlign: "center",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fff",
    textDecoration: "none",
    color: "#222",
  },
};
export default MainDashboard;
