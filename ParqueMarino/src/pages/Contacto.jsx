import React from 'react'

import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import SeccionRetroalimentacion from '../components/SeccionRetroalimentacion/SeccionRetroalimentacion';
import Footer from '../components/Footer/Footer';

function Contacto() {
  return (
    <div>
        <Header/>
        <MenuUsuario/>
        <SeccionRetroalimentacion/>
        <Footer/>
    </div>
  )
}

export default Contacto