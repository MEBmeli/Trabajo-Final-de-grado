// src/components/FamiliaDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";


import FamilyDetailModule from "./FamiliaDetailModule"; // mismo nombre que el export

function FamiliaDetailPage({ user, onLogout }) {
  const { id } = useParams(); // viene de /familias/:id

  return (
    <FamilyDetailModule
      user={user}
      onLogout={onLogout}
      familyId={id} // 👈 este id llega al useMemo del módulo
    />
  );
}


export default FamiliaDetailPage;
