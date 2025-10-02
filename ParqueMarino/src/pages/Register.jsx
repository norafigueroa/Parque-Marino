import React from 'react'
import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import FormularioRegistro from '../components/FormularioRegistro/FormularioRegistro';
import Footer from '../components/Footer/Footer';


function Register() {
  return (
    <div>
      <Header/>
      <MenuUsuario/>
      <FormularioRegistro/>
      <Footer/>
    </div>
  )
}

export default Register