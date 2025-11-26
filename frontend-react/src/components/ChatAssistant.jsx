import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hola 👋 Soy el asistente del Sistema de Adopción. Puedo ayudarte a crear un nuevo expediente, buscar uno existente o guiarte en las secciones.",
    },
    {
      from: "bot",
      text: "Por ejemplo, podés escribir: “crear expediente nuevo” o “buscar expediente 3”.",
    },
  ]);
  const [input, setInput] = useState("");
  const [flow, setFlow] = useState(null); // ej: "crearExpediente"
  const [tempExpediente, setTempExpediente] = useState({});
  const navigate = useNavigate();

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const addMessage = (from, text) => {
    setMessages((prev) => [...prev, { from, text }]);
  };

  const handleUserMessage = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    addMessage("user", trimmed);
    setInput("");

    // Si estoy en un flujo guiado (ej: creando expediente)
    if (flow === "crearExpediente_nombre") {
      const nuevo = { ...tempExpediente, niñoNombre: trimmed };
      setTempExpediente(nuevo);
      setFlow("crearExpediente_edad");
      addMessage(
        "bot",
        "Perfecto. ¿Qué edad tiene el niño o niña? (solo número, en años)"
      );
      return;
    }

    if (flow === "crearExpediente_edad") {
      const edadNum = Number(trimmed);
      const nuevo = { ...tempExpediente, niñoEdad: isNaN(edadNum) ? trimmed : edadNum };
      setTempExpediente(nuevo);
      setFlow("crearExpediente_resumen");

      addMessage(
        "bot",
        `Listo. Voy a preparar un expediente con: nombre "${nuevo.niñoNombre}" y edad "${nuevo.niñoEdad}".`
      );
      addMessage(
        "bot",
        "Para terminar, te voy a llevar al formulario de creación de expediente. Allí vas a poder completar el resto de los datos."
      );

      // 👉 Aquí podrías pasar datos por query params o estado
      setTimeout(() => {
        navigate("/expedientes/nuevo");
      }, 1500);
      return;
    }

    // Si NO estoy en un flujo, interpreto intención
    const lower = trimmed.toLowerCase();

    if (lower.includes("crear expediente")) {
      setFlow("crearExpediente_nombre");
      setTempExpediente({});
      addMessage(
        "bot",
        "Perfecto 🧾. Vamos a crear un nuevo expediente.\n¿Cómo se llama el niño o niña?"
      );
      return;
    }

    if (lower.startsWith("buscar expediente")) {
      // ejemplo: "buscar expediente 3"
      const parts = lower.split(" ");
      const posibleId = parts[parts.length - 1];
      const idNum = Number(posibleId);

      if (!idNum) {
        addMessage(
          "bot",
          "Para buscar un expediente escribí por ejemplo: 'buscar expediente 3' (con el número al final)."
        );
        return;
      }

      addMessage("bot", `Perfecto, te llevo al expediente ${idNum} 📂`);
      setTimeout(() => {
        navigate(`/expedientes/${idNum}`);
      }, 1000);
      return;
    }

    if (lower.includes("ayuda") || lower.includes("expediente")) {
      addMessage(
        "bot",
        "Puedo ayudarte con estas acciones:\n- 'crear expediente nuevo'\n- 'buscar expediente 3'\n- Consultar qué módulos están disponibles."
      );
      return;
    }

    // Respuesta por defecto
    addMessage(
      "bot",
      "Por ahora entiendo comandos como:\n- 'crear expediente nuevo'\n- 'buscar expediente 3'\nTambién puedo darte una guía sobre las pantallas del sistema."
    );
  };

  return (
    <>
      {/* Botón flotante */}
      <button style={styles.fab} onClick={toggleOpen}>
        🤖
      </button>

      {/* Panel del chat */}
      {isOpen && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <span style={styles.headerTitle}>Asistente del sistema</span>
            <button style={styles.headerClose} onClick={toggleOpen}>
              ✕
            </button>
          </div>

          <div style={styles.messages}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.msgBase,
                  ...(m.from === "bot" ? styles.msgBot : styles.msgUser),
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form style={styles.inputRow} onSubmit={handleUserMessage}>
            <input
              style={styles.input}
              placeholder="Escribí tu consulta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button style={styles.sendButton}>➤</button>
          </form>
        </div>
      )}
    </>
  );
}

const styles = {
  fab: {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    width: "52px",
    height: "52px",
    borderRadius: "400%",
    border: "none",
    background: "#172d7cff",
    color: "#fff",
    fontSize: "1.4rem",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  panel: {
    position: "fixed",
    right: "24px",
    bottom: "90px",
    width: "320px",
    maxHeight: "420px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 999,
  },
  header: {
    background: "#173f7c",
    color: "#fff",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: "0.95rem",
    fontWeight: 600,
  },
  headerClose: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
  messages: {
    flex: 1,
    padding: "8px 10px",
    overflowY: "auto",
    background: "#f3f4f6",
  },
  msgBase: {
    fontSize: "0.85rem",
    padding: "6px 8px",
    borderRadius: "8px",
    marginBottom: "6px",
    whiteSpace: "pre-line",
  },
  msgBot: {
    background: "#e5e7eb",
    alignSelf: "flex-start",
    maxWidth: "90%",
  },
  msgUser: {
    background: "#173f7c",
    color: "#fff",
    alignSelf: "flex-end",
    maxWidth: "90%",
  },
  inputRow: {
    display: "flex",
    borderTop: "1px solid #e5e7eb",
  },
  input: {
    flex: 1,
    border: "none",
    padding: "8px",
    fontSize: "0.9rem",
    outline: "none",
  },
  sendButton: {
    border: "none",
    background: "#173f7c",
    color: "#fff",
    width: "44px",
    cursor: "pointer",
  },
};

export default ChatAssistant;
