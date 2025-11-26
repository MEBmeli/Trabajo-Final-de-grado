// src/components/ExpedienteDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ExpedienteDetailModule from "./ExpedienteDetailModule";

function ExpedienteDetailPage({ user, onLogout }) {
  const { id } = useParams(); // viene de /expedientes/:id

  return (
    <ExpedienteDetailModule
      user={user}
      onLogout={onLogout}
      expedienteId={id}
    />
  );
}

export default ExpedienteDetailPage;
