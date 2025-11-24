// src/components/MainDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function MainDashboard({ user, onLogout }) {
  // Estadísticas mock (fijas por ahora)
  const stats = [
    { label: "Expedientes activos", value: 24 },
    { label: "Niños en tránsito", value: 9 },
    { label: "Familias postulantes", value: 18 },
    { label: "Hogares convivenciales", value: 5 },
  ];

  // Módulos principales
  const modules = [
    { path: "/ia", label: "Módulo de IA", description: "Sugerencias, matching y análisis." },
    { path: "/expedientes", label: "Expedientes", description: "Gestión de expedientes judiciales." },
    { path: "/familias", label: "Familias", description: "Seguimiento de familias postulantes." },
    { path: "/hogares", label: "Hogares", description: "Gestión de hogares convivenciales." },
    { path: "/informes", label: "Informes", description: "Carga y consulta de informes." },
  ];

  return (
    <div style={styles.page}>
      <Header onLogout={onLogout} />

      {/* Estadísticas principales */}
      <section style={styles.statsSection}>
        <h2 style={styles.sectionTitle}>Resumen general</h2>

        <div style={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} style={styles.statCard}>
              <span style={styles.statValue}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Módulos */}
      <section>
        <h2 style={styles.subtitle}>Módulos principales</h2>
        <div style={styles.grid}>
          {modules.map((mod) => (
            <Link key={mod.path} to={mod.path} style={styles.card}>
              <h3>{mod.label}</h3>
              <p>{mod.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  // Bloque de estadísticas
  statsSection: {
    marginBottom: "25px",
  },
  sectionTitle: {
    marginBottom: "10px",
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
  },
  statCard: {
    background: "#f5f7fb",
    borderRadius: "10px",
    padding: "14px",
    textAlign: "center",
    border: "1px solid #e0e4f0",
  },
  statValue: {
    display: "block",
    fontSize: "1.6rem",
    fontWeight: "bold",
    color: "#173f7c",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#555",
  },

  // Módulos
  subtitle: {
    marginBottom: "15px",
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 arriba, 2 abajo con 5 módulos
    columnGap: "30px",
    rowGap: "25px",
    justifyItems: "center",
  },
  card: {
    width: "200px",
    padding: "18px",
    textAlign: "center",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fff",
    textDecoration: "none",
    color: "#222",
  },
};

export default MainDashboard;
