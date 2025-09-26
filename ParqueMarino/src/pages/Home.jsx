import React from 'react'

import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import Footer from '../components/Footer/Footer';
import SeccionInformacion from '../components/SeccionInformacion/SeccionInformacion';

function Home() {
  return (
    <div>
        
      <Header/>
      <MenuUsuario/>
      <SeccionInformacion/>
      <Footer/>

    </div>
  )
}

export default Home