import React from 'react'
import Header from '../components/Header/Header';
import MenuAdmin from '../components/MenuAdmin/MenuAdmin';
import BienvenidoAdmin from '../components/BienvenidoAdmin/BienvenidoAdmin';
import Footer from '../components/Footer/Footer';

function HomeAdmin() {
  return (
    <div>
      <Header />
      <MenuAdmin />
      <BienvenidoAdmin />
      <Footer/>

    </div>
  )
}

export default HomeAdmin