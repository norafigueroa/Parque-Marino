import React from 'react'

import Header from '../components/Header/Header';
import MenuAdmin from '../components/MenuAdmin/MenuAdmin';
import FormularioAnimales from '../components/FormularioAnimales/FormularioAnimales';
import Footer from '../components/Footer/Footer';

function AdminFormAnimal() {
  return (
    <div>
        <Header/>
        <MenuAdmin />
        <FormularioAnimales/>
        <Footer/>        
    </div>
  )
}

export default AdminFormAnimal