// src/components/ExpedientesModule.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  

import Header from "./Header";

// 🔹 Mismo mock que usás en IA
const MOCK_EXPEDIENTES = [
  {
    id: 1,
    numero: "EXP-2024-001",
    nino: "Juan Pérez",
    edad: 7,
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    requiereGrupoHermanos: true,
  },
  {
    id: 2,
    numero: "EXP-2024-002",
    nino: "María Gómez",
    edad: 5,
    provincia: "Córdoba",
    ciudad: "Villa María",
    requiereGrupoHermanos: false,
  },
  {
    id: 3,
    numero: "EXP-2024-015",
    nino: "Ana Torres",
    edad: 9,
    provincia: "Buenos Aires",
    ciudad: "La Plata",
    requiereGrupoHermanos: true,
  },
];

function ExpedientesModule({ user, onLogout }) {
  const [search, setSearch] = useState("");

  const resultados = MOCK_EXPEDIENTES.filter(
    (e) =>
      e.numero.toLowerCase().includes(search.toLowerCase()) ||
      e.nino.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <Header onLogout={onLogout} />

      <h2 style={styles.title}>Expedientes</h2>

      {/* 🔹 Buscador */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Buscar por número o nombre..."
          style={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔹 Tabla */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Número</th>
            <th style={styles.th}>Niño/a</th>
            <th style={styles.th}>Edad</th>
            <th style={styles.th}>Ubicación</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {resultados.map((exp) => (
            <tr key={exp.id}>
              <td style={styles.td}>{exp.numero}</td>
              <td style={styles.td}>{exp.nino}</td>
              <td style={styles.td}>{exp.edad}</td>
              <td style={styles.td}>
                {exp.provincia} – {exp.ciudad}
              </td>
              <td style={styles.tdAction}>
                <a
                  href={`/expedientes/${exp.id}`}
                  style={styles.link}
                >
                  Ver detalle
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  page: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "12px",
  },
  filters: {
    marginBottom: "15px",
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    width: "300px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    background: "#e5ecff",
    padding: "8px",
    textAlign: "left",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #eee",
  },
  tdAction: {
    padding: "8px",
    textAlign: "center",
  },
  link: {
    color: "#173f7c",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default ExpedientesModule;
