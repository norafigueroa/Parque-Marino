import React from 'react'
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function PrivateRoutesAdmin({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Si no hay usuario logueado
  if (!usuario) {
    Swal.fire('Acceso denegado', 'Necesitas iniciar sesión', 'warning');
    return <Navigate to="/Login" />;
  }

  // Solo admins pueden acceder
  if (usuario.tipoUsuario !== "admin") {
    Swal.fire('Acceso denegado', 'Solo los administradores pueden acceder a esta sección', 'warning');
    return <Navigate to="/" />;
  }

  return children;
}


export default PrivateRoutesAdmin