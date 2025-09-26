import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

function MenuUsuario() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Función para manejar acceso a rutas privadas
  const manejarAcceso = (ruta) => {
    if (!usuario) {
      Swal.fire('Acceso denegado', 'Necesitas iniciar sesión', 'warning');
      navigate('/Login');
    } else {
      navigate(ruta);
    }
  }

  return (
    <div>
        <div>
          
          <div className='navBar'>
            <h3 onClick={() => navigate('/')}>🏠 Inicio</h3>
            <h3 onClick={() => navigate('/Especies')}>🐟 Especies</h3>
            <h3 onClick={() => manejarAcceso('/Citas')}>📅 Citas</h3>
            <h3 onClick={() => navigate('/Crustaceos')}>🦀 Animales</h3>
            <h3 onClick={() => navigate('/Juego')}>🎮 Juego</h3>
          </div>

          <div>
            <h1>Descubre la Magia del Océano</h1>
            <button onClick={() => manejarAcceso('/Citas')}>🎫 Comprar Entradas</button>
            <button>🎮 Aprende jugando</button>
          </div>

        </div>
    </div>
  )
}

export default MenuUsuario