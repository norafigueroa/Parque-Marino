import React from 'react'
import Header from '../components/Header/Header';
import MenuAdmin from '../components/MenuAdmin/MenuAdmin';
import TarjetaEspecie from '../components/TarjetaEspecie/TarjetaEspecie';
import Footer from '../components/Footer/Footer';


function AdminEspecies() {
  return (
    <div>
        <Header/>
        <MenuAdmin />
        <TarjetaEspecie/>
        <Footer/>        
    </div>
  )
}

export default AdminEspecies