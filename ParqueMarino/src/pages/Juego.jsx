import React from 'react'
import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import JuegoMemoria from '../components/JuegoMemoria/JuegoMemoria';
import Footer from '../components/Footer/Footer';

function Juego() {
  return (
    <div>
      <Header/>
      <MenuUsuario/>
      <JuegoMemoria />
      <Footer/>
    </div>
  )
}

export default Juego