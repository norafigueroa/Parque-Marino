import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MenuAdmin.css';

function MenuAdmin() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
         <div className='navBar'>
            <h3 onClick={() => navigate('/HomeAdmin')}>🏠 Inicio</h3>
            <h3 onClick={() => navigate('/AdminAnimales')}>🦀 Animales</h3>
            <h3 onClick={() => navigate('/AdminEspecies')}>🐟 Especies</h3>
            <h3 onClick={() => navigate('/CitasAdmin')}>📅 Citas</h3>
            <h3 onClick={() => navigate('/RegisterAdmin')}>📝 Registrar</h3>
          </div>
      </div>
    </div>
  )
}

export default MenuAdmin