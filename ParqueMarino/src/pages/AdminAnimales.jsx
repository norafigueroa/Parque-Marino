import React from 'react'
import Header from '../components/Header/Header';
import FormularioAnimales from '../components/FormularioAnimales/FormularioAnimales';
import Footer from '../components/Footer/Footer';

function AdminAnimales() {
  return (
    <div>
        <Header/>
        <FormularioAnimales/>
        <Footer/>
    </div>
  )
}

export default AdminAnimales