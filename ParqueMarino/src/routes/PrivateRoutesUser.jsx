import React from 'react'
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function PrivateRoutesUser({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Si no hay usuario logueado
  if (!usuario) {
    Swal.fire('Acceso denegado', 'Necesitas iniciar sesión', 'warning');
    return <Navigate to="/Login" />;
  }

  // Si el usuario es admin, no puede acceder a rutas de usuario normal
  if (usuario.tipoUsuario === "admin") {
    Swal.fire('Acceso denegado', 'Los administradores no pueden acceder a esta sección', 'warning');
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoutesUser