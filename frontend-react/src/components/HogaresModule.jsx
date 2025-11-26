// src/components/HogaresModule.jsx
import React, { useMemo, useState } from "react";
import Header from "./Header";

const MOCK_HOGARES = [
  {
    id: 1,
    nombre: "Hogar Esperanza",
    tipo: "Hogar convivencial",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    capacidad: 15,
    ninosActuales: 9,
    estado: "Habilitado",
    responsable: "Lic. Ana Rodríguez",
  },
  {
    id: 2,
    nombre: "Hogar Los Aromos",
    tipo: "Residencia para niños",
    provincia: "Córdoba",
    ciudad: "Villa María",
    capacidad: 10,
    ninosActuales: 7,
    estado: "En revisión",
    responsable: "Lic. Martín Suárez",
  },
  {
    id: 3,
    nombre: "Hogar Caminos",
    tipo: "Hogar convivencial",
    provincia: "Buenos Aires",
    ciudad: "La Plata",
    capacidad: 12,
    ninosActuales: 11,
    estado: "Habilitado",
    responsable: "Lic. Carla López",
  },
];

function HogaresModule({ user, onLogout }) {
  const [search, setSearch] = useState("");
  const [provinciaFilter, setProvinciaFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");

  const resumen = useMemo(() => {
    const total = MOCK_HOGARES.length;
    const habilitados = MOCK_HOGARES.filter(
      (h) => h.estado === "Habilitado"
    ).length;
    const enRevision = MOCK_HOGARES.filter(
      (h) => h.estado === "En revisión"
    ).length;

    const capacidadTotal = MOCK_HOGARES.reduce(
      (acc, h) => acc + h.capacidad,
      0
    );
    const ocupacionTotal = MOCK_HOGARES.reduce(
      (acc, h) => acc + h.ninosActuales,
      0
    );

    return { total, habilitados, enRevision, capacidadTotal, ocupacionTotal };
  }, []);

  const provincias = useMemo(() => {
    const set = new Set(MOCK_HOGARES.map((h) => h.provincia));
    return Array.from(set);
  }, []);

  const hogaresFiltrados = useMemo(() => {
    return MOCK_HOGARES.filter((h) => {
      const texto = `${h.nombre} ${h.ciudad} ${h.provincia}`.toLowerCase();
      const matchSearch = texto.includes(search.toLowerCase());

      const matchProvincia =
        !provinciaFilter || h.provincia === provinciaFilter;

      const matchEstado =
        !estadoFilter || h.estado.toLowerCase() === estadoFilter.toLowerCase();

      return matchSearch && matchProvincia && matchEstado;
    });
  }, [search, provinciaFilter, estadoFilter]);

  return (
    <div style={styles.page}>
      <Header onLogout={onLogout} />

      <h2 style={styles.title}>Gestión de hogares convivenciales</h2>
      {user && (
        <p style={styles.userInfo}>
          Operando como <strong>{user.full_name}</strong> ({user.role})
        </p>
      )}

      {/* Resumen superior */}
      <section style={styles.resumenSection}>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.total}</span>
          <span style={styles.resumenLabel}>Hogares totales</span>
        </div>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.habilitados}</span>
          <span style={styles.resumenLabel}>Habilitados</span>
        </div>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.enRevision}</span>
          <span style={styles.resumenLabel}>En revisión</span>
        </div>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>
            {resumen.ocupacionTotal} / {resumen.capacidadTotal}
          </span>
          <span style={styles.resumenLabel}>Niños/as alojados / capacidad</span>
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
              placeholder="Nombre del hogar, ciudad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />
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
            <label style={styles.filterLabel}>Estado</label>
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
              style={styles.input}
            >
              <option value="">Todos</option>
              <option value="Habilitado">Habilitado</option>
              <option value="En revisión">En revisión</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tabla de hogares */}
      <section>
        <h3 style={styles.tableTitle}>Listado de hogares</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Tipo</th>
                <th style={styles.th}>Provincia / Ciudad</th>
                <th style={styles.th}>Capacidad</th>
                <th style={styles.th}>Niños/as alojados</th>
                <th style={styles.th}>Estado</th>
                <th style={styles.th}>Responsable</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {hogaresFiltrados.length === 0 ? (
                <tr>
                  <td style={styles.tdEmpty} colSpan={8}>
                    No se encontraron hogares para los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                hogaresFiltrados.map((h) => (
                  <tr key={h.id}>
                    <td style={styles.td}>{h.nombre}</td>
                    <td style={styles.td}>{h.tipo}</td>
                    <td style={styles.td}>
                      {h.provincia} – {h.ciudad}
                    </td>
                    <td style={styles.td}>{h.capacidad}</td>
                    <td style={styles.td}>{h.ninosActuales}</td>
                    <td style={styles.td}>{h.estado}</td>
                    <td style={styles.td}>{h.responsable}</td>
                    <td style={styles.td}>
                      <a
                        href={`/hogares/${h.id}`}
                        style={{
                          color: "#173f7c",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Ver ficha
                      </a>
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

  // 🔹 Resumen (tarjetas)
  resumenSection: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginBottom: "20px",
  },
  resumenCard: {
    background: "#f5f7fb",          // fondo azulado
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

  // 🔹 Filtros (caja con fondo)
  filtersSection: {
    marginBottom: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "12px 14px",
    background: "#f9fafb",          // gris muy clarito
  },
  filtersTitle: {
    margin: 0,
    marginBottom: "10px",
    fontSize: "1rem",
    fontWeight: "600",
  },
  filtersGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
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
    background: "#fff",
  },

  // 🔹 Tabla
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
    background: "#e5ecff",          // header más marcado
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #c7d2fe",
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



export default HogaresModule;
