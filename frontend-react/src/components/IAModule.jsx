// src/components/IAModule.jsx
import React, { useMemo, useState } from "react";
import Header from "./Header";
import { registrarPropuesta } from "./propuestasIA";

// Mock de expedientes (simplificado)
const MOCK_EXPEDIENTES = [
  {
    id: 1,
    numero: "EXP-2024-001",
    nino: "Juan Pérez",
    edad: 7,
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    hermanos: 1,
    requiereGrupoHermanos: true,
  },
  {
    id: 2,
    numero: "EXP-2024-002",
    nino: "María Gómez",
    edad: 5,
    provincia: "Córdoba",
    ciudad: "Villa María",
    hermanos: 0,
    requiereGrupoHermanos: false,
  },
  {
    id: 3,
    numero: "EXP-2024-015",
    nino: "Ana Torres",
    edad: 9,
    provincia: "Buenos Aires",
    ciudad: "La Plata",
    hermanos: 2,
    requiereGrupoHermanos: true,
  },
];

// Mock de familias
const MOCK_FAMILIAS = [
  {
    id: 1,
    nombre: "Familia Pérez - López",
    tipo: "Matrimonio",
    estado: "En evaluación",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    disponibilidadEdad: "0 a 5 años",
    aceptaGruposHermanos: "Sí",
  },
  {
    id: 2,
    nombre: "Familia Gómez",
    tipo: "Monoparental",
    estado: "Postulante",
    provincia: "Córdoba",
    ciudad: "Villa María",
    disponibilidadEdad: "6 a 10 años",
    aceptaGruposHermanos: "No",
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
  },
];

// Función auxiliar: verifica si la edad está dentro del rango
function edadCompatible(edadNino, rangoTexto) {
  const match = rangoTexto.match(/(\d+)\s*a\s*(\d+)/);
  if (!match) return false;

  const min = parseInt(match[1], 10);
  const max = parseInt(match[2], 10);

  return edadNino >= min && edadNino <= max;
}

// Calcula un puntaje simple de compatibilidad
function calcularPuntaje(exp, fam) {
  let puntaje = 0;
  const detalles = [];

  // 1. Edad
  if (edadCompatible(exp.edad, fam.disponibilidadEdad)) {
    puntaje += 40;
    detalles.push("Edad compatible (+40)");
  } else detalles.push("Edad fuera del rango");

  // 2. Provincia
  if (exp.provincia === fam.provincia) {
    puntaje += 25;
    detalles.push("Misma provincia (+25)");
  } else detalles.push("Provincia diferente");

  // 3. Ciudad
  if (exp.ciudad === fam.ciudad) {
    puntaje += 10;
    detalles.push("Misma ciudad (+10)");
  }

  // 4. Grupos de hermanos
  if (exp.requiereGrupoHermanos) {
    if (fam.aceptaGruposHermanos === "Sí") {
      puntaje += 25;
      detalles.push("Acepta grupos de hermanos (+25)");
    } else detalles.push("No acepta grupos de hermanos");
  }

  // 5. Estado
  const estadosValidos = ["Postulante", "En evaluación", "En vinculación"];
  if (!estadosValidos.includes(fam.estado)) {
    puntaje -= 10;
    detalles.push("Estado no prioritario (-10)");
  }

  if (puntaje < 0) puntaje = 0;

  return { puntaje, detalles };
}

function IAModule({ user, onLogout }) {
  const [expedienteSeleccionadoId, setExpedienteSeleccionadoId] = useState(
    MOCK_EXPEDIENTES[0]?.id || null
  );

  const [propuesta, setPropuesta] = useState(null);

  const expedienteSeleccionado = useMemo(
    () =>
      MOCK_EXPEDIENTES.find((e) => e.id === expedienteSeleccionadoId) || null,
    [expedienteSeleccionadoId]
  );

  const resultados = useMemo(() => {
    if (!expedienteSeleccionado) return [];

    return MOCK_FAMILIAS.map((familia) => {
      const { puntaje, detalles } = calcularPuntaje(
        expedienteSeleccionado,
        familia
      );
      return { familia, puntaje, detalles };
    })
      .sort((a, b) => b.puntaje - a.puntaje)
      .filter((r) => r.puntaje > 0);
  }, [expedienteSeleccionado]);

  const handleProponerFamilia = (familia, expediente) => {
    setPropuesta({ familia, expediente });
  };

  return (
    <div style={styles.page}>
      <Header onLogout={onLogout} />

      <h2 style={styles.title}>Módulo de IA – Sugerencia de familias</h2>

      {/* Selección expediente */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>1. Seleccionar expediente</h3>

        <div style={styles.sectionGrid}>
          <div>
            <label style={styles.label}>Expediente</label>
            <select
              value={expedienteSeleccionadoId}
              onChange={(e) =>
                setExpedienteSeleccionadoId(Number(e.target.value))
              }
              style={styles.input}
            >
              {MOCK_EXPEDIENTES.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.numero} – {e.nino} ({e.edad} años)
                </option>
              ))}
            </select>
          </div>

          {expedienteSeleccionado && (
            <div style={styles.infoCard}>
              <p style={styles.infoLine}>
                <strong>Niño/a:</strong> {expedienteSeleccionado.nino}
              </p>
              <p style={styles.infoLine}>
                <strong>Edad:</strong> {expedienteSeleccionado.edad} años
              </p>
              <p style={styles.infoLine}>
                <strong>Ubicación:</strong>{" "}
                {expedienteSeleccionado.provincia} –{" "}
                {expedienteSeleccionado.ciudad}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Ranking */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>2. Ranking de familias compatibles</h3>

        {resultados.length === 0 ? (
          <p style={styles.muted}>
            No se encontraron familias compatibles para este expediente.
          </p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Puntaje</th>
                <th style={styles.th}>Familia</th>
                <th style={styles.th}>Ubicación</th>
                <th style={styles.th}>Disponibilidad</th>
                <th style={styles.th}>Hermanos</th>
                <th style={styles.th}>Estado</th>
                <th style={styles.th}>Criterios</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {resultados.map((r) => (
                <tr key={r.familia.id}>
                  <td style={styles.tdPuntaje}>{r.puntaje}/100</td>
                  <td style={styles.td}>{r.familia.nombre}</td>
                  <td style={styles.td}>
                    {r.familia.provincia} – {r.familia.ciudad}
                  </td>
                  <td style={styles.td}>{r.familia.disponibilidadEdad}</td>
                  <td style={styles.td}>{r.familia.aceptaGruposHermanos}</td>
                  <td style={styles.td}>{r.familia.estado}</td>
                  <td style={styles.tdDetalle}>
                    <ul style={styles.detalleList}>
                      {r.detalles.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </td>

                  {/* Acciones */}
                  <td style={styles.tdAction}>
                    <a
                      href={`/familias/${r.familia.id}`}
                      style={{
                        color: "#173f7c",
                        textDecoration: "underline",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Ver detalle
                    </a>

                    <button
                      style={styles.proponerButton}
                      onClick={() =>
                        handleProponerFamilia(
                          r.familia,
                          expedienteSeleccionado
                        )
                      }
                    >
                      Proponer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal */}
      
      {propuesta && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Confirmar propuesta</h3>

            <p>
              ¿Confirmás sugerir a
              <strong> {propuesta.familia.nombre} </strong>
              como familia candidata para el expediente
              <strong> {propuesta.expediente.numero}</strong>?
            </p>
             

            <div style={styles.modalButtons}>
              <button
                style={styles.modalConfirm}
               onClick={() => {
                    registrarPropuesta(
                         propuesta.expediente.id,
                          propuesta.familia,
                     propuesta.puntaje || 0
                                  );
                          alert("Propuesta registrada correctamente.");
                                     setPropuesta(null);  
                    }}
              >
                Confirmar
              </button>

              <button
                style={styles.modalCancel}
                onClick={() => setPropuesta(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
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
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "1.4rem",
    fontWeight: "600",
  },
  section: {
    marginBottom: "20px",
    background: "#f9fafb",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1.2fr",
    gap: "12px",
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: "500",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#fff",
    width: "100%",
  },
  infoCard: {
    background: "#fff",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #eee",
  },
  infoLine: {
    margin: "3px 0",
  },
  muted: {
    fontSize: "0.85rem",
    color: "#555",
  },

  // Tabla
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  },
  th: {
    background: "#e5ecff",
    borderBottom: "1px solid #c7d2fe",
    padding: "8px",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #eee",
  },
  tdPuntaje: {
    padding: "8px",
    borderBottom: "1px solid #eee",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  tdDetalle: {
    padding: "8px",
    borderBottom: "1px solid #eee",
  },
  tdAction: {
    padding: "8px",
    borderBottom: "1px solid #eee",
    textAlign: "center",
  },

  detalleList: {
    margin: 0,
    paddingLeft: "18px",
    fontSize: "0.8rem",
  },

  // Botón proponer
  proponerButton: {
    padding: "6px 10px",
    background: "#173f7c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "600",
  },

  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    width: "380px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  modalTitle: {
    marginTop: 0,
    marginBottom: "10px",
    fontSize: "1.1rem",
    fontWeight: "600",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "15px",
  },
  modalConfirm: {
    padding: "8px 12px",
    background: "#173f7c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  modalCancel: {
    padding: "8px 12px",
    background: "#ccc",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default IAModule;
