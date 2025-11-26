// Base de datos mock para propuestas de IA
export let PROPUESTAS_IA = [];

// Función para registrar una propuesta
export function registrarPropuesta(expedienteId, familia, puntaje) {
  PROPUESTAS_IA.push({
    expedienteId,
    familia,
    puntaje,
    fecha: new Date().toLocaleDateString(),
  });
}
