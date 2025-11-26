// src/components/FamiliesModule.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

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
  },
];

function FamiliesModule({ user, onLogout }) {
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [provinciaFilter, setProvinciaFilter] = useState("");
  const [edadFilter, setEdadFilter] = useState("");

  // Resumen superior
  const resumen = useMemo(() => {
    const total = MOCK_FAMILIAS.length;
    const postulantes = MOCK_FAMILIAS.filter(
      (f) => f.estado === "Postulante"
    ).length;
    const enEvaluacion = MOCK_FAMILIAS.filter(
      (f) => f.estado === "En evaluación"
    ).length;
    const enVinculacion = MOCK_FAMILIAS.filter(
      (f) => f.estado === "En vinculación"
    ).length;

    return { total, postulantes, enEvaluacion, enVinculacion };
  }, []);

  const provincias = useMemo(() => {
    const set = new Set(MOCK_FAMILIAS.map((f) => f.provincia));
    return Array.from(set);
  }, []);

  const rangosEdad = useMemo(() => {
    const set = new Set(MOCK_FAMILIAS.map((f) => f.disponibilidadEdad));
    return Array.from(set);
  }, []);

  const familiasFiltradas = useMemo(() => {
    return MOCK_FAMILIAS.filter((fam) => {
      const texto = `${fam.nombre} ${fam.ciudad} ${fam.provincia}`.toLowerCase();
      const matchSearch = texto.includes(search.toLowerCase());

      const matchEstado =
        !estadoFilter || fam.estado.toLowerCase() === estadoFilter.toLowerCase();

      const matchProvincia =
        !provinciaFilter || fam.provincia === provinciaFilter;

      const matchEdad =
        !edadFilter || fam.disponibilidadEdad === edadFilter;

      return matchSearch && matchEstado && matchProvincia && matchEdad;
    });
  }, [search, estadoFilter, provinciaFilter, edadFilter]);

  return (
    <div style={styles.page}>
      <Header onLogout={onLogout} />

      <h2 style={styles.title}>Gestión de familias postulantes</h2>
      {user && (
        <p style={styles.userInfo}>
          Operando como <strong>{user.full_name}</strong> ({user.role})
        </p>
      )}

      {/* Resumen superior */}
      <section style={styles.resumenSection}>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.total}</span>
          <span style={styles.resumenLabel}>Familias registradas</span>
        </div>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.postulantes}</span>
          <span style={styles.resumenLabel}>Postulantes</span>
        </div>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.enEvaluacion}</span>
          <span style={styles.resumenLabel}>En evaluación</span>
        </div>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.enVinculacion}</span>
          <span style={styles.resumenLabel}>En vinculación</span>
        </div>
      </section>

      {/* Filtros */}
      <section style={styles.filtersSection}>
        <h3 style={styles.filtersTitle}>Filtros</h3>
        <div style={styles.filtersGrid}>
          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Buscar</label>
            <input
              type="text"
              placeholder="Nombre de familia, ciudad, provincia..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Estado</label>
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
              style={styles.input}
            >
              <option value="">Todos</option>
              <option value="Postulante">Postulante</option>
              <option value="En evaluación">En evaluación</option>
              <option value="En vinculación">En vinculación</option>
              <option value="Acompañamiento post adoptivo">
                Acompañamiento post adoptivo
              </option>
            </select>
          </div>

          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Provincia</label>
            <select
              value={provinciaFilter}
              onChange={(e) => setProvinciaFilter(e.target.value)}
              style={styles.input}
            >
              <option value="">Todas</option>
              {provincias.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Rango de edad</label>
            <select
              value={edadFilter}
              onChange={(e) => setEdadFilter(e.target.value)}
              style={styles.input}
            >
              <option value="">Todos</option>
              {rangosEdad.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Tabla de familias */}
      <section>
        <h3 style={styles.tableTitle}>Listado de familias</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre de familia</th>
                <th style={styles.th}>Tipo</th>
                <th style={styles.th}>Estado</th>
                <th style={styles.th}>Provincia / Ciudad</th>
                <th style={styles.th}>Disponibilidad de edad</th>
                <th style={styles.th}>Grupos de hermanos</th>
                <th style={styles.th}>Fecha inscripción</th>
                <th style={styles.th}>Acciones</th>

              </tr>
            </thead>
            <tbody>
              {familiasFiltradas.length === 0 ? (
                <tr>
                  <td style={styles.tdEmpty} colSpan={7}>
                    No se encontraron familias para los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                familiasFiltradas.map((fam) => (
                  <tr key={fam.id}>
                    <td style={styles.td}>{fam.nombre}</td>
                    <td style={styles.td}>{fam.tipo}</td>
                    <td style={styles.td}>{fam.estado}</td>
                    <td style={styles.td}>
                      {fam.provincia} – {fam.ciudad}
                    </td>
                    <td style={styles.td}>{fam.disponibilidadEdad}</td>
                    <td style={styles.td}>{fam.aceptaGruposHermanos}</td>
                    <td style={styles.td}>{fam.fechaInscripcion}</td>
                    <td style={styles.td}>
                     <Link to={`/familias/${fam.id}`}
                        style={{ color: "#173f7c", textDecoration: "underline", cursor: "pointer" }}>
                            Ver detalle
                          </Link>
                        </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
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

  // Resumen tarjetas
  resumenSection: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginBottom: "20px",
  },
  resumenCard: {
    background: "#f5f7fb",
    borderRadius: "10px",
    padding: "12px",
    textAlign: "center",
    border: "1px solid #e0e4f0",
  },
  resumenValue: {
    display: "block",
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#173f7c",
    marginBottom: "4px",
  },
  resumenLabel: {
    fontSize: "0.85rem",
    color: "#555",
  },

  // Filtros
  filtersSection: {
    marginBottom: "20px",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "12px 14px",
  },
  filtersTitle: {
    margin: 0,
    marginBottom: "10px",
    fontSize: "1rem",
    fontWeight: "600",
  },
  filtersGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "12px",
  },
  filterItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  filterLabel: {
    fontSize: "0.85rem",
    fontWeight: "500",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.9rem",
  },

  // Tabla
  tableTitle: {
    marginBottom: "8px",
    fontSize: "1rem",
    fontWeight: "600",
  },
  tableWrapper: {
    borderRadius: "10px",
    border: "1px solid #eee",
    overflow: "hidden",
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
  tdEmpty: {
    padding: "12px",
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
  },
};

export default FamiliesModule;
