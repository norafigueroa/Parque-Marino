import React from 'react'
import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import TarjetaEspecie from '../components/TarjetaEspecie/TarjetaEspecie'
import Footer from '../components/Footer/Footer';


function Especies() {
  return (
    <div>
      <Header/>
      <MenuUsuario/>
      <TarjetaEspecie/> 
      <Footer/>
    </div>
  )
}

export default Especies