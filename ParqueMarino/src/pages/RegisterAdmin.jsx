import React from 'react'
import Header from '../components/Header/Header';
import MenuAdmin from '../components/MenuAdmin/MenuAdmin';
import FormularioRegistroAdmin from '../components/FormularioRegistroAdmin/FormularioRegistroAdmin';
import Footer from '../components/Footer/Footer';


function RegisterAdmin() {

  return (
    <div>
      <Header/>
      <MenuAdmin />
      <FormularioRegistroAdmin /> 
      <Footer/> 
    </div>
  )
}

export default RegisterAdmin