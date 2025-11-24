// src/components/ExpedientesModule.jsx
import React from "react";
import { Link } from "react-router-dom";

function ExpedientesModule({ onLogout }) {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Módulo de Expedientes</h1>
        <div>
          <Link to="/">Volver al panel</Link>
          <button onClick={onLogout} style={{ marginLeft: "10px" }}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <main style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}>
        <p>Aquí irán las pantallas de carga, consulta y gestión de expedientes.</p>
      </main>
    </div>
  );
}

export default ExpedientesModule;
