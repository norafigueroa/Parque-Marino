import React from 'react'
import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import TarjetaAnimales from '../components/TarjetaAnimales/TarjetaAnimales'
import Footer from '../components/Footer/Footer'; 

function Animales() {
  return (
    <div>
        <Header/>
        <MenuUsuario/>
        <TarjetaAnimales/>
        <Footer/>
    </div>
  )
}

export default Animales