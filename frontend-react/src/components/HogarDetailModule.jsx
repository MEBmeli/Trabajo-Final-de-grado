// src/components/HogarDetailModule.jsx
import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

// Datos mock de hogares convivenciales
const MOCK_HOGARES = [
  {
    id: 1,
    nombre: "Hogar Esperanza",
    tipo: "Hogar convivencial",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    direccion: "Av. Libertad 1200",
    telefono: "351-4455667",
    email: "hogar.esperanza@example.com",
    capacidad: 15,
    ninosActuales: 9,
    estado: "Habilitado",
    responsable: "Lic. Ana Rodríguez",
    fechaHabilitacion: "2021-05-10",
    ultimaInspeccion: "2024-03-01",
    observacionesGenerales: "Hogar con trayectoria, buen trabajo en articulación con el equipo técnico.",
  },
  {
    id: 2,
    nombre: "Hogar Los Aromos",
    tipo: "Residencia para niños",
    provincia: "Córdoba",
    ciudad: "Villa María",
    direccion: "Bv. San Martín 450",
    telefono: "353-4221100",
    email: "aromos@example.com",
    capacidad: 10,
    ninosActuales: 7,
    estado: "En revisión",
    responsable: "Lic. Martín Suárez",
    fechaHabilitacion: "2022-08-20",
    ultimaInspeccion: "2024-02-10",
    observacionesGenerales: "Se solicitaron mejoras edilicias menores.",
  },
];

// Niños alojados (mock)
const MOCK_NINOS = [
  {
    id: 1,
    hogarId: 1,
    nombre: "Juan Pérez",
    edad: 7,
    situacion: "En tránsito",
    expediente: "EXP-2024-001",
  },
  {
    id: 2,
    hogarId: 1,
    nombre: "María Gómez",
    edad: 5,
    situacion: "En valoración",
    expediente: "EXP-2024-010",
  },
  {
    id: 3,
    hogarId: 2,
    nombre: "Pedro López",
    edad: 9,
    situacion: "En tránsito",
    expediente: "EXP-2023-145",
  },
];

// Visitas / inspecciones (mock)
const MOCK_VISITAS = [
  {
    id: 1,
    hogarId: 1,
    fecha: "2024-01-15",
    profesional: "Lic. Carla López",
    tipo: "Visita programada",
    observaciones: "Buena higiene y organización del hogar.",
  },
  {
    id: 2,
    hogarId: 1,
    fecha: "2024-03-01",
    profesional: "Lic. Ana Rodríguez",
    tipo: "Inspección",
    observaciones: "Se recomienda reforzar espacios de estudio.",
  },
  {
    id: 3,
    hogarId: 2,
    fecha: "2024-02-10",
    profesional: "Lic. Martín Suárez",
    tipo: "Inspección",
    observaciones: "Pendiente presentación de informe edilicio.",
  },
];

function HogarDetailModule({ user, onLogout }) {
  const { id } = useParams();
  const hogarId = parseInt(id, 10);
  const navigate = useNavigate();

  const hogar = useMemo(
    () => MOCK_HOGARES.find((h) => h.id === hogarId),
    [hogarId]
  );

  const ninosHogar = useMemo(
    () => MOCK_NINOS.filter((n) => n.hogarId === hogarId),
    [hogarId]
  );

  const visitas = useMemo(
    () => MOCK_VISITAS.filter((v) => v.hogarId === hogarId),
    [hogarId]
  );

  const puedeEditar =
    user && (user.role === "TECNICO" || user.role === "ADMIN");

  const [nota, setNota] = useState("");

  if (!hogar) {
    return (
      <div style={styles.page}>
        <Header onLogout={onLogout} />
        <p>El hogar convivencial no existe.</p>
        <button style={styles.backButton} onClick={() => navigate("/hogares")}>
          Volver a hogares
        </button>
      </div>
    );
  }

  const handleGuardarNota = () => {
    alert(`Nota guardada (mock) para ${hogar.nombre}: ${nota}`);
    setNota("");
  };

  return (
    <div style={styles.page}>
      <Header onLogout={onLogout} />

      <button style={styles.backButton} onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <h2 style={styles.title}>{hogar.nombre}</h2>

      {/* Info general */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Información general</h3>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Tipo de hogar</label>
            <p>{hogar.tipo}</p>
          </div>
          <div>
            <label style={styles.label}>Estado</label>
            <p>{hogar.estado}</p>
          </div>
          <div>
            <label style={styles.label}>Provincia</label>
            <p>{hogar.provincia}</p>
          </div>
          <div>
            <label style={styles.label}>Ciudad</label>
            <p>{hogar.ciudad}</p>
          </div>
          <div>
            <label style={styles.label}>Dirección</label>
            <p>{hogar.direccion}</p>
          </div>
          <div>
            <label style={styles.label}>Responsable</label>
            <p>{hogar.responsable}</p>
          </div>
          <div>
            <label style={styles.label}>Teléfono</label>
            <p>{hogar.telefono}</p>
          </div>
          <div>
            <label style={styles.label}>Email</label>
            <p>{hogar.email}</p>
          </div>
        </div>
      </section>

      {/* Capacidad */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Capacidad y habilitación</h3>
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Capacidad máxima</label>
            <p>{hogar.capacidad} niños/as</p>
          </div>
          <div>
            <label style={styles.label}>Niños/as alojados actualmente</label>
            <p>{hogar.ninosActuales}</p>
          </div>
          <div>
            <label style={styles.label}>Fecha de habilitación</label>
            <p>{hogar.fechaHabilitacion}</p>
          </div>
          <div>
            <label style={styles.label}>Última inspección</label>
            <p>{hogar.ultimaInspeccion}</p>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={styles.label}>Observaciones generales</label>
            <p>{hogar.observacionesGenerales}</p>
          </div>
        </div>
      </section>

      {/* Niños alojados */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Niños/as alojados en el hogar</h3>

        {ninosHogar.length === 0 ? (
          <p style={styles.muted}>No hay niños/as registrados en este hogar.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Edad</th>
                <th style={styles.th}>Situación</th>
                <th style={styles.th}>N° expediente</th>
              </tr>
            </thead>
            <tbody>
              {ninosHogar.map((n) => (
                <tr key={n.id}>
                  <td style={styles.td}>{n.nombre}</td>
                  <td style={styles.td}>{n.edad}</td>
                  <td style={styles.td}>{n.situacion}</td>
                  <td style={styles.td}>{n.expediente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Visitas / inspecciones */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Visitas e inspecciones</h3>

        {visitas.length === 0 ? (
          <p style={styles.muted}>No hay visitas registradas para este hogar.</p>
        ) : (
          <ul style={styles.list}>
            {visitas.map((v) => (
              <li key={v.id} style={styles.listItem}>
                <strong>{v.fecha} — {v.profesional}</strong>
                <div style={styles.muted}>{v.tipo}</div>
                <div style={styles.muted}>{v.observaciones}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Notas del equipo técnico */}
      {puedeEditar && (
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Notas del equipo técnico</h3>
          <textarea
            placeholder="Registrar observaciones sobre el hogar, necesidades de acompañamiento, etc."
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            style={styles.textarea}
          />
          <button style={styles.saveButton} onClick={handleGuardarNota}>
            Guardar nota 
          </button>
        </section>
      )}
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
  },
  backButton: {
    marginBottom: "10px",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
    cursor: "pointer",
  },
  title: {
    marginTop: 0,
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: "16px",
  },
  section: {
    marginBottom: "20px",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "14px",
  },
  sectionTitle: {
    margin: 0,
    marginBottom: "10px",
    fontSize: "1rem",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: "600",
    marginBottom: "3px",
  },
  muted: {
    fontSize: "0.85rem",
    color: "#777",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  },
  th: {
    background: "#f0f2f8",
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    fontWeight: "600",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #eee",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  listItem: {
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  textarea: {
    width: "100%",
    minHeight: "70px",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  saveButton: {
    marginTop: "8px",
    padding: "8px 14px",
    background: "#173f7c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default HogarDetailModule;
