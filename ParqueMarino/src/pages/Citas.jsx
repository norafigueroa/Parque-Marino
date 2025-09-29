import React from 'react'
import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import FormularioCitas from '../components/FormularioCitas/FormularioCitas'
import Footer from '../components/Footer/Footer';

function Citas() {
  return (
    <div>
      <Header/>
      <MenuUsuario/>
      <FormularioCitas />
      <Footer/>
    </div>
  )
}

export default Citas