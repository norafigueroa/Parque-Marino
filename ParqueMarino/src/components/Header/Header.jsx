import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Header() {
  const navigate = useNavigate();

  // Recuperar usuario del localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

  // Función para mostrar SweetAlert con await
  const cerrarSesion = async () => {
    try {
      const resultado = await Swal.fire({
        title: '¿Cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar',
      });

      if (resultado.isConfirmed) {
        localStorage.removeItem('usuario');
        await Swal.fire('Sesión cerrada', '', 'success');
        navigate('/Login');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };


  return (

    <div>

        <div className="header">
          
          <img className='logo' src="https://cdn-icons-png.flaticon.com/512/1303/1303577.png" width="100px" alt="Logo" />
          <h1 className="nombreApp">Parque Marino</h1> 

          {/* Mostrar botón solo si hay usuario */}
          {usuario && (<button onClick={cerrarSesion}> Cerrar Sesión </button>)}

          <hr />

        </div>

    </div>
  )
}

export default Header