import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Descubre.css';

function Descubre({ usuario }) {
    const navigate = useNavigate();

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
        <div className='descubre'>
            <h1>Descubre la Magia del Océano</h1>
            <button onClick={() => manejarAcceso('/Citas')}>🎫 Comprar Entradas</button>
            <button>🎮 Aprende jugando</button>
        </div>
    </div>
  )
}

export default Descubre