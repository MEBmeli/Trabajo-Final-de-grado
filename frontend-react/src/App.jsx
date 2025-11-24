import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import MainDashboard from "./components/MainDashboard";
import IAModule from "./components/IAModule";
import ExpedientesModule from "./components/ExpedientesModule";
import FamiliasModule from "./components/FamiliasModule";
import HogaresModule from "./components/HogaresModule";
import InformesModule from "./components/InformesModule";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLoginSuccess = (loggedUser) => setUser(loggedUser);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      {/* 🔥 ESTE ES EL CONTENEDOR GLOBAL QUE CENTRA TODO */}
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "40px",
          background: "#f5f5f5",
          overflowX: "hidden",
        }}
      >
        {/* 🔥 ESTA ES LA CAJA CENTRAL DEL SISTEMA */}
        <div style={{ width: "900px", maxWidth: "95%" }}>
          <Routes>
            <Route
              path="/login"
              element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainDashboard user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ia"
              element={
                <ProtectedRoute>
                  <IAModule user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/expedientes"
              element={
                <ProtectedRoute>
                  <ExpedientesModule user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/familias"
              element={
                <ProtectedRoute>
                  <FamiliasModule user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/hogares"
              element={
                <ProtectedRoute>
                  <HogaresModule user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/informes"
              element={
                <ProtectedRoute>
                  <InformesModule user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
