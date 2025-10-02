import React from 'react'
import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import DetallePago from '../components/DetallePago/DetallePago'
import Footer from '../components/Footer/Footer';


function FormaPago() {
  return (
    <div>
        <div>
          <Header/>
          <MenuUsuario/>
          <DetallePago />
          <Footer/>
        </div>
    </div>
  )
}

export default FormaPago