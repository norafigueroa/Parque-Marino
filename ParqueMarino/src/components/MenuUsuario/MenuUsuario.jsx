import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import './MenuUsuario.css';

function MenuUsuario() {
   const navigate = useNavigate();
   const usuario = JSON.parse(localStorage.getItem('usuario'));

  const manejarAcceso = (ruta) => {
    if (!usuario) {
      Swal.fire('Acceso denegado', 'Necesitas iniciar sesión', 'warning');
      navigate('/Login');
    } else {
      navigate(ruta);
    }
  };

  return (
    <div>
          
          <div className='navBar'>
            <h3 onClick={() => navigate('/')}>🏠 Inicio</h3>
            <h3 onClick={() => navigate('/Especies')}>🐟 Especies</h3>
            <h3 onClick={() => manejarAcceso('/Citas')}>📅 Citas</h3>
            <h3 onClick={() => navigate('/Login')}>🔑 Inicio de Sesión</h3>
            <h3 onClick={() => navigate('/Contacto')}>📞 Contacto</h3>
            <h3 onClick={() => navigate('/SobreNosotros')}>🌐 Sobre Nosotros</h3>
            <h3 onClick={() => navigate('/Juego')}>🎮 Juego</h3>
          </div>

    </div>
  )
}

export default MenuUsuario