import React, { useMemo } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";


const MOCK_FAMILIAS = [
  {
    id: 1,
    nombre: "Familia Pérez - López",
    tipo: "Matrimonio",
    estado: "Postulante",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    disponibilidadEdad: "0 a 5 años",
    aceptaGruposHermanos: "Sí",
    fechaInscripcion: "2024-02-10",
    telefono: "+54 351 555-1234",
    email: "familia.perez@example.com",
    observaciones:
      "Cuentan con experiencia previa en cuidado de niños, vivienda propia y red de apoyo extendida.",
  },
  {
    id: 2,
    nombre: "Familia Gómez",
    tipo: "Monoparental",
    estado: "En evaluación",
    provincia: "Córdoba",
    ciudad: "Villa María",
    disponibilidadEdad: "6 a 10 años",
    aceptaGruposHermanos: "No",
    fechaInscripcion: "2024-03-05",
    telefono: "+54 353 444-5678",
    email: "familia.gomez@example.com",
    observaciones:
      "Vivienda en zona urbana, cuenta con flexibilidad horaria y acompañamiento de familiares cercanos.",
  },
  {
    id: 3,
    nombre: "Familia Rodríguez - Sosa",
    tipo: "Matrimonio",
    estado: "En vinculación",
    provincia: "Buenos Aires",
    ciudad: "La Plata",
    disponibilidadEdad: "0 a 10 años",
    aceptaGruposHermanos: "Sí",
    fechaInscripcion: "2023-11-20",
    telefono: "+54 221 555-9012",
    email: "familia.rodriguez@example.com",
    observaciones:
      "Actualmente en proceso de vinculación con un grupo de hermanos. Poseen informe favorable del equipo técnico.",
  },
  {
    id: 4,
    nombre: "Familia Torres",
    tipo: "Pareja conviviente",
    estado: "Postulante",
    provincia: "Córdoba",
    ciudad: "Río Cuarto",
    disponibilidadEdad: "0 a 3 años",
    aceptaGruposHermanos: "No",
    fechaInscripcion: "2024-05-01",
    telefono: "+54 358 444-2222",
    email: "familia.torres@example.com",
    observaciones:
      "Vivienda con espacio reducido pero adecuada para un niño pequeño. Cuentan con acompañamiento psicológico.",
  },
  {
    id: 5,
    nombre: "Familia Herrera",
    tipo: "Matrimonio",
    estado: "Acompañamiento post adoptivo",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    disponibilidadEdad: "0 a 8 años",
    aceptaGruposHermanos: "Sí",
    fechaInscripcion: "2022-09-15",
    telefono: "+54 341 555-7777",
    email: "familia.herrera@example.com",
    observaciones:
      "Familia con adopción ya concretada, actualmente en etapa de acompañamiento post adoptivo.",
  },
];



function FamilyDetailModule({ user, onLogout, familyId }) {
   const navigate = useNavigate();

  const handleVolver = () => {
    navigate(-1); // vuelve a la página anterior
  };
  const familia = useMemo(() => {
    const idNumber = Number(familyId);
    

    // Si familyId existe y corresponde a una familia válida
    if (idNumber) {
      const encontrada = MOCK_FAMILIAS.find((f) => f.id === idNumber);
      if (encontrada) return encontrada;
    }

    // 🔹 Si NO existe familyId o no coincide con ninguna familia → fallback
    return {
      id: 0,
      nombre: "Familia no encontrada",
      tipo: "-",
      estado: "-",
      provincia: "-",
      ciudad: "-",
      disponibilidadEdad: "-",
      aceptaGruposHermanos: "-",
      fechaInscripcion: "-",
      telefono: "-",
      email: "-",
      observaciones: "No se halló información para esta familia.",
    };
  }, [familyId]);

  return (
    <div style={styles.page}>
      <Header onLogout={onLogout} />

      <h2 style={styles.title}>Detalle de familia postulante</h2>
       <button style={styles.backButton} onClick={handleVolver}>
    ← Volver
  </button>
      {user && (
        <p style={styles.userInfo}>
          Operando como <strong>{user.full_name}</strong> ({user.role})
        </p>
      )}

      {/* Datos principales */}
      <section style={styles.mainSection}>
        <div style={styles.mainCard}>
          <h3 style={styles.sectionTitle}>Datos principales</h3>
          <div style={styles.detailGrid}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Nombre de la familia</span>
              <span style={styles.detailValue}>{familia.nombre}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Tipo de grupo familiar</span>
              <span style={styles.detailValue}>{familia.tipo}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Estado en el sistema</span>
              <span style={{ ...styles.detailValue, ...styles.badgeEstado }}>
                {familia.estado}
              </span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Fecha de inscripción</span>
              <span style={styles.detailValue}>
                {familia.fechaInscripcion}
              </span>
            </div>
          </div>
        </div>

        <div style={styles.mainCard}>
          <h3 style={styles.sectionTitle}>Ubicación y contacto</h3>
          <div style={styles.detailGrid}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Provincia</span>
              <span style={styles.detailValue}>{familia.provincia}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Ciudad</span>
              <span style={styles.detailValue}>{familia.ciudad}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Teléfono</span>
              <span style={styles.detailValue}>{familia.telefono}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Correo electrónico</span>
              <span style={styles.detailValue}>{familia.email}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disponibilidad y perfil */}
      <section style={styles.sectionBlock}>
        <h3 style={styles.sectionTitle}>Perfil y disponibilidad</h3>
        <div style={styles.detailGrid}>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Rango de edad disponible</span>
            <span style={styles.detailValue}>
              {familia.disponibilidadEdad}
            </span>
          </div>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Acepta grupos de hermanos</span>
            <span style={styles.detailValue}>
              {familia.aceptaGruposHermanos}
            </span>
          </div>
        </div>
      </section>

      {/* Observaciones / notas del equipo técnico */}
      <section style={styles.sectionBlock}>
        <h3 style={styles.sectionTitle}>Observaciones del equipo técnico</h3>
        <div style={styles.observacionesBox}>
          <p style={styles.observacionesText}>
            {familia.observaciones ||
              "No se registran observaciones adicionales para esta familia."}
          </p>
        </div>
      </section>

      {/* (Opcional) Historial o futuras integraciones: vinculación, informes, etc. */}
      <section style={styles.sectionBlock}>
        <h3 style={styles.sectionTitle}>Historial de participación</h3>
        <p style={styles.smallText}>
          En esta sección se podrán visualizar, a futuro, los expedientes en los
          que intervino la familia, las instancias de vinculación y las
          resoluciones asociadas.
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

  observacionesBox: {
    background: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    padding: "10px 12px",
  },
  observacionesText: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#374151",
  },
  smallText: {
    margin: 0,
    fontSize: "0.85rem",
    color: "#6b7280",
  },
};

export default FamilyDetailModule;
