/// src/components/ExpedienteDetailModule.jsx
import React, { useMemo } from "react";
import Header from "./Header";

const MOCK_EXPEDIENTES = [
  {
    id: 1,
    numero: "EXP-2024-001",
    niñoNombre: "Juan Pérez",
    niñoEdad: 7,
    situacion: "Niño en situación de adoptabilidad",
    estado: "En guarda preadoptiva",
    juzgado: "Juzgado de Niñez, Adolescencia y Violencia Familiar N° 1",
    hogar: "Hogar Amanecer",
  },
  {
    id: 2,
    numero: "EXP-2024-002",
    niñoNombre: "María López",
    niñoEdad: 5,
    situacion: "Medidas excepcionales en curso",
    estado: "En evaluación técnica",
    juzgado: "Juzgado de Niñez N° 3",
    hogar: "Hogar Esperanza",
  },
  {
    id: 3,
    numero: "EXP-2024-003",
    niñoNombre: "Hermanos Gómez (2 niños)",
    niñoEdad: 9,
    situacion: "Declaratoria de adoptabilidad",
    estado: "En búsqueda de familia",
    juzgado: "Juzgado de Niñez N° 2",
    hogar: "Hogar San José",
  },
];

function ExpedienteDetailModule({ user, onLogout, expedienteId }) {
  // seleccionar el expediente según el ID de la URL
  const expediente = useMemo(() => {
    const idNumber = Number(expedienteId);

    if (idNumber) {
      const encontrado = MOCK_EXPEDIENTES.find((e) => e.id === idNumber);
      if (encontrado) return encontrado;
    }

    // fallback si no existe
    return {
      id: 0,
      numero: "No encontrado",
      niñoNombre: "-",
      niñoEdad: "-",
      situacion: "No se halló información para este expediente.",
      estado: "-",
      juzgado: "-",
      hogar: "-",
    };
  }, [expedienteId]);

  return (
    <div style={styles.page}>
      <Header onLogout={onLogout} />

      <h2 style={styles.title}>Detalle de expediente</h2>
      {user && (
        <p style={styles.userInfo}>
          Operando como <strong>{user.full_name}</strong> ({user.role})
        </p>
      )}

      {/* Datos principales */}
      <section style={styles.mainSection}>
        <div style={styles.mainCard}>
          <h3 style={styles.sectionTitle}>Datos del expediente</h3>
          <div style={styles.detailGrid}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Número de expediente</span>
              <span style={styles.detailValue}>{expediente.numero}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Estado</span>
              <span style={{ ...styles.detailValue, ...styles.badgeEstado }}>
                {expediente.estado}
              </span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Juzgado interviniente</span>
              <span style={styles.detailValue}>{expediente.juzgado}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Hogar / Dispositivo</span>
              <span style={styles.detailValue}>{expediente.hogar}</span>
            </div>
          </div>
        </div>

        <div style={styles.mainCard}>
          <h3 style={styles.sectionTitle}>Datos del niño / grupo de hermanos</h3>
          <div style={styles.detailGrid}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Nombre</span>
              <span style={styles.detailValue}>{expediente.niñoNombre}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Edad</span>
              <span style={styles.detailValue}>{expediente.niñoEdad} años</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Situación</span>
              <span style={styles.detailValue}>{expediente.situacion}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque futuro: informes, IA, etc. */}
      <section style={styles.sectionBlock}>
        <h3 style={styles.sectionTitle}>Seguimiento e informes</h3>
        <p style={styles.smallText}>
          Aquí se visualizarán los informes interdisciplinarios, audiencias y
          resoluciones asociadas al expediente. Esta sección puede integrarse con
          el módulo de informes y el motor de IA de sugerencias.
        </p>
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
  },
  title: {
    marginTop: "5px",
    marginBottom: "4px",
    fontSize: "1.4rem",
    fontWeight: "600",
  },
  userInfo: {
    marginTop: 0,
    marginBottom: "18px",
    fontSize: "0.9rem",
    color: "#555",
  },
  mainSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "20px",
  },
  mainCard: {
    background: "#f5f7fb",
    borderRadius: "10px",
    padding: "14px 16px",
    border: "1px solid #e0e4f0",
  },
  sectionBlock: {
    marginBottom: "18px",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "12px 14px",
  },
  sectionTitle: {
    margin: 0,
    marginBottom: "10px",
    fontSize: "1rem",
    fontWeight: "600",
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px 16px",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  detailLabel: {
    fontSize: "0.8rem",
    fontWeight: "500",
    color: "#555",
  },
  detailValue: {
    fontSize: "0.95rem",
    color: "#111",
  },
  badgeEstado: {
    display: "inline-block",
    background: "#e0ecff",
    borderRadius: "999px",
    padding: "2px 8px",
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#173f7c",
  },
  smallText: {
    margin: 0,
    fontSize: "0.85rem",
    color: "#6b7280",
  },
};

export default ExpedienteDetailModule;
