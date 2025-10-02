import React from 'react'
import './BienvenidoAdmin.css';

function BienvenidoAdmin() {
  return (
    <div>
        <div className="bienvenido-container">
            <h1 className="bienvenido-titulo">¡Bienvenido, Administrador!</h1>
            <p className="bienvenido-texto">
                Desde aquí puedes gestionar las citas, revisar el historial de visitantes y mantener actualizado el contenido del parque.
            </p>
        </div>
    </div>
  )
}

export default BienvenidoAdmin