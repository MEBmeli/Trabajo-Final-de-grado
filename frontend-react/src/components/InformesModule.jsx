// src/components/InformesModule.jsx
import React, { useMemo, useState } from "react";
import Header from "./Header";

const MOCK_INFORMES = [
  {
    id: 1,
    expediente: "EXP-2024-001",
    nino: "Juan Pérez",
    tipo: "Psicológico",
    fecha: "2024-03-15",
    profesional: "Lic. Ana Rodríguez",
    rolProfesional: "Psicóloga",
    resumen: "Evaluación del vínculo y estado emocional actual.",
    archivo: "informe_psico_juan_15032024.pdf",
  },
  {
    id: 2,
    expediente: "EXP-2024-001",
    nino: "Juan Pérez",
    tipo: "Social",
    fecha: "2024-03-20",
    profesional: "Lic. Martín Suárez",
    rolProfesional: "Trabajador social",
    resumen: "Relevamiento socioambiental del hogar convivencial.",
    archivo: "informe_social_juan_20032024.pdf",
  },
  {
    id: 3,
    expediente: "EXP-2024-002",
    nino: "María Gómez",
    tipo: "Médico",
    fecha: "2024-04-05",
    profesional: "Dra. Laura López",
    rolProfesional: "Pediatra",
    resumen: "Control general de salud y seguimiento de medicación.",
    archivo: "informe_medico_maria_05042024.pdf",
  },
  {
    id: 4,
    expediente: "EXP-2024-015",
    nino: "Ana Torres",
    tipo: "Psicológico",
    fecha: "2024-06-10",
    profesional: "Lic. Carla Fernández",
    rolProfesional: "Psicóloga",
    resumen: "Evaluación de adaptación en guarda con fines de adopción.",
    archivo: "informe_psico_ana_10062024.pdf",
  },
];

function InformesModule({ user, onLogout }) {
  const [informes, setInformes] = useState(MOCK_INFORMES);
  const [search, setSearch] = useState("");
  const [tipoFilter, setTipoFilter] = useState("");
  const [rolFilter, setRolFilter] = useState("");

  const [nuevoInforme, setNuevoInforme] = useState({
    expediente: "",
    nino: "",
    tipo: "",
    fecha: "",
    profesional: "",
    rolProfesional: "",
    resumen: "",
  });

  const puedeCargar =
    user && (user.role === "TECNICO" || user.role === "ADMIN");

  // Resumen por tipo
  const resumen = useMemo(() => {
    const total = informes.length;
    const psicologicos = informes.filter((i) => i.tipo === "Psicológico").length;
    const sociales = informes.filter((i) => i.tipo === "Social").length;
    const medicos = informes.filter((i) => i.tipo === "Médico").length;
    return { total, psicologicos, sociales, medicos };
  }, [informes]);

  const rolesProfesionales = useMemo(() => {
    const set = new Set(informes.map((i) => i.rolProfesional));
    return Array.from(set);
  }, [informes]);

  const informesFiltrados = useMemo(() => {
    return informes.filter((i) => {
      const texto = `${i.expediente} ${i.nino} ${i.profesional} ${i.resumen}`.toLowerCase();
      const matchSearch = texto.includes(search.toLowerCase());

      const matchTipo = !tipoFilter || i.tipo === tipoFilter;
      const matchRol = !rolFilter || i.rolProfesional === rolFilter;

      return matchSearch && matchTipo && matchRol;
    });
  }, [informes, search, tipoFilter, rolFilter]);

  const handleChangeNuevo = (e) => {
    const { name, value } = e.target;
    setNuevoInforme((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarNuevo = (e) => {
    e.preventDefault();

    if (
      !nuevoInforme.expediente ||
      !nuevoInforme.nino ||
      !nuevoInforme.tipo ||
      !nuevoInforme.fecha ||
      !nuevoInforme.profesional
    ) {
      alert("Por favor completá al menos expediente, niño, tipo, fecha y profesional.");
      return;
    }

    const nuevo = {
      id: Date.now(),
      archivo: "informe_mock.pdf",
      ...nuevoInforme,
    };

    setInformes((prev) => [nuevo, ...prev]);
    setNuevoInforme({
      expediente: "",
      nino: "",
      tipo: "",
      fecha: "",
      profesional: "",
      rolProfesional: "",
      resumen: "",
    });

    alert("Informe guardado (mock). Más adelante se conectará al backend.");
  };

  return (
    <div style={styles.page}>
      <Header onLogout={onLogout} />

      <h2 style={styles.title}>Informes interdisciplinarios</h2>
      {user && (
        <p style={styles.userInfo}>
          Operando como <strong>{user.full_name}</strong> ({user.role})
        </p>
      )}

      {/* Resumen */}
      <section style={styles.resumenSection}>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.total}</span>
          <span style={styles.resumenLabel}>Informes totales</span>
        </div>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.psicologicos}</span>
          <span style={styles.resumenLabel}>Psicológicos</span>
        </div>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.sociales}</span>
          <span style={styles.resumenLabel}>Sociales</span>
        </div>
        <div style={styles.resumenCard}>
          <span style={styles.resumenValue}>{resumen.medicos}</span>
          <span style={styles.resumenLabel}>Médicos</span>
        </div>
      </section>

      {/* Filtros */}
      <section style={styles.filtersSection}>
        <h3 style={styles.sectionTitle}>Filtros</h3>
        <div style={styles.filtersGrid}>
          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Buscar</label>
            <input
              type="text"
              placeholder="Expediente, niño, profesional..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Tipo de informe</label>
            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              style={styles.input}
            >
              <option value="">Todos</option>
              <option value="Psicológico">Psicológico</option>
              <option value="Social">Social</option>
              <option value="Médico">Médico</option>
            </select>
          </div>

          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Rol profesional</label>
            <select
              value={rolFilter}
              onChange={(e) => setRolFilter(e.target.value)}
              style={styles.input}
            >
              <option value="">Todos</option>
              {rolesProfesionales.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Tabla */}
      <section>
        <h3 style={styles.tableTitle}>Listado de informes</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Expediente</th>
                <th style={styles.th}>Niño / Niña</th>
                <th style={styles.th}>Tipo</th>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Profesional</th>
                <th style={styles.th}>Rol profesional</th>
                <th style={styles.th}>Resumen</th>
                <th style={styles.th}>Archivo</th>
              </tr>
            </thead>
            <tbody>
              {informesFiltrados.length === 0 ? (
                <tr>
                  <td style={styles.tdEmpty} colSpan={8}>
                    No se encontraron informes para los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                informesFiltrados.map((i) => (
                  <tr key={i.id}>
                    <td style={styles.td}>{i.expediente}</td>
                    <td style={styles.td}>{i.nino}</td>
                    <td style={styles.td}>{i.tipo}</td>
                    <td style={styles.td}>{i.fecha}</td>
                    <td style={styles.td}>{i.profesional}</td>
                    <td style={styles.td}>{i.rolProfesional}</td>
                    <td style={styles.td}>{i.resumen}</td>
                    <td style={styles.td}>{i.archivo}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Carga de informe (solo técnico/admin) */}
      {puedeCargar && (
        <section style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Cargar nuevo informe (mock)</h3>
          <form onSubmit={handleGuardarNuevo} style={styles.formGrid}>
            <div style={styles.formItem}>
              <label style={styles.filterLabel}>N° de expediente</label>
              <input
                name="expediente"
                value={nuevoInforme.expediente}
                onChange={handleChangeNuevo}
                placeholder="Ej: EXP-2024-020"
                style={styles.input}
              />
            </div>

            <div style={styles.formItem}>
              <label style={styles.filterLabel}>Niño / Niña</label>
              <input
                name="nino"
                value={nuevoInforme.nino}
                onChange={handleChangeNuevo}
                placeholder="Nombre del niño/a"
                style={styles.input}
              />
            </div>

            <div style={styles.formItem}>
              <label style={styles.filterLabel}>Tipo de informe</label>
              <select
                name="tipo"
                value={nuevoInforme.tipo}
                onChange={handleChangeNuevo}
                style={styles.input}
              >
                <option value="">Seleccionar...</option>
                <option value="Psicológico">Psicológico</option>
                <option value="Social">Social</option>
                <option value="Médico">Médico</option>
              </select>
            </div>

            <div style={styles.formItem}>
              <label style={styles.filterLabel}>Fecha</label>
              <input
                type="date"
                name="fecha"
                value={nuevoInforme.fecha}
                onChange={handleChangeNuevo}
                style={styles.input}
              />
            </div>

            <div style={styles.formItem}>
              <label style={styles.filterLabel}>Profesional</label>
              <input
                name="profesional"
                value={nuevoInforme.profesional}
                onChange={handleChangeNuevo}
                placeholder="Nombre del profesional"
                style={styles.input}
              />
            </div>

            <div style={styles.formItem}>
              <label style={styles.filterLabel}>Rol profesional</label>
              <input
                name="rolProfesional"
                value={nuevoInforme.rolProfesional}
                onChange={handleChangeNuevo}
                placeholder="Ej: Psicóloga, Trabajador social..."
                style={styles.input}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={styles.filterLabel}>Resumen</label>
              <textarea
                name="resumen"
                value={nuevoInforme.resumen}
                onChange={handleChangeNuevo}
                placeholder="Breve síntesis del informe..."
                style={styles.textarea}
              />
            </div>

            <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
              <button type="submit" style={styles.saveButton}>
                Guardar informe 
              </button>
            </div>
          </form>
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

  // Resumen
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
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "12px 14px",
    background: "#f9fafb",
  },
  sectionTitle: {
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
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  },
  th: {
    background: "#e5ecff",
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #c7d2fe",
    fontWeight: "600",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #eee",
    verticalAlign: "top",
  },
  tdEmpty: {
    padding: "12px",
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
  },

  // Formulario de carga
  formSection: {
    marginTop: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "14px",
    background: "#fdfdfd",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginTop: "8px",
  },
  formItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  textarea: {
    width: "100%",
    minHeight: "70px",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "0.9rem",
    boxSizing: "border-box",
  },
  saveButton: {
    padding: "8px 14px",
    background: "#173f7c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default InformesModule;
