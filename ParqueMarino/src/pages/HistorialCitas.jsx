import React from 'react'

import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import DetalleReserva from '../components/DetalleReserva/DetalleReserva';
import Footer from '../components/Footer/Footer';

function HistorialCitas() {
  return (
    <div>
      <Header />
      <MenuUsuario />
      <DetalleReserva />
      <Footer />
    </div>
  )
}

export default HistorialCitas