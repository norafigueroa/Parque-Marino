import React from 'react'
import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import FormularioLogin from '../components/FormularioLogin/FormularioLogin';
import Footer from '../components/Footer/Footer';


function Login() {
  return (
    <div>
      <Header/>
      <MenuUsuario/>
      <FormularioLogin/> 
      <Footer/>
    </div>
  )
}

export default Login