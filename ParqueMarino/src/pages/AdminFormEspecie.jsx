import React from 'react'

import Header from '../components/Header/Header';
import MenuAdmin from '../components/MenuAdmin/MenuAdmin';
import FormularioEspecies from '../components/FormularioEspecies/FormularioEspecies';
import Footer from '../components/Footer/Footer';

function AdminFormEspecie() {
  return (
    <div>
        <Header/>
        <MenuAdmin />
        <FormularioEspecies/>
        <Footer/>    
    </div>
  )
}

export default AdminFormEspecie