// src/App.jsx
import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import UserCreateForm from "./components/UserCreateForm";

function App() {
  const [user, setUser] = useState(null);

  // Al cargar la app, intento leer usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (loggedUser) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Si NO hay usuario → mostrar solo login
  if (!user) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Sistema de Adopción</h1>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Si hay usuario pero NO es admin
  if (user.role !== "ADMIN") {
    return (
      <div style={{ maxWidth: "600px", margin: "30px auto" }}>
        <h1>Sistema de Adopción</h1>
        <p>Bienvenido/a, {user.full_name}</p>
        <p>Estás logueado con el rol: <strong>{user.role}</strong></p>
        <button onClick={handleLogout}>Cerrar sesión</button>
        {/* Acá podrías mostrar otras pantallas para JUEZ, TECNICO, etc. */}
      </div>
    );
  }

  // Si es ADMIN → mostrar panel con creación de usuarios
  return (
    <div style={{ maxWidth: "800px", margin: "30px auto" }}>
      <h1>Sistema de Adopción</h1>
      <p>Bienvenido/a, <strong>{user.full_name}</strong> (ADMIN)</p>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <hr style={{ margin: "20px 0" }} />

      <UserCreateForm />
    </div>
  );
}

export default App;

