import React from 'react'
import PreciosImg from './Precios.png';
import './SeccionInformacion.css';

function SeccionInformacion() {
  return (
    <div>
        <div className="seccion-info">
            <div className='tarjetaInfo'>
                <h3>Horarios</h3>
                <p>📅</p>
                <p>De Martes a Domingo</p>
                <p>de 9:00 a.m.</p>
                <p>a 4:30 p.m.</p>
            </div>

            <div className='tarjetaInfo'>
                <h3>Entradas</h3>
                <img src={PreciosImg} alt="Precios" className="imagen-precios"/>
            </div>

            <div className='tarjetaInfo'>
                <h3>Ubicación</h3>
                <p>Paseo de los Turistas, Puntarenas, Costa Rica.</p>
                <p>200 metros al oeste de la terminal de buses de San José y a 300 metros del muelle y la antigua Capitanía de Puerto.</p>
            </div>

        </div>
    </div>
  )
}

export default SeccionInformacion