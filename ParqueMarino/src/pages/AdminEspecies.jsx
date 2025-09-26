import React from 'react'
import Header from '../components/Header/Header';
import FormularioEspecies from '../components/FormularioEspecies/FormularioEspecies';
import Footer from '../components/Footer/Footer';


function AdminEspecies() {
  return (
    <div>
        <Header/>
        <FormularioEspecies/>
        <Footer/>        
    </div>
  )
}

export default AdminEspecies