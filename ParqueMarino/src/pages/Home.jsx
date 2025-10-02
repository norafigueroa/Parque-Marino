import React from 'react'

import Header from '../components/Header/Header';
import MenuUsuario from '../components/MenuUsuario/MenuUsuario';
import Descubre from '../components/Descubre/Descubre';
import SeccionInformacion from '../components/SeccionInformacion/SeccionInformacion';
import CarruselImagenes from '../components/CarruselImagenes/CarruselImagenes';
import Footer from '../components/Footer/Footer';

function Home() {
  return (
    <div>
        
      <Header/>
      <MenuUsuario/>
      <Descubre/>
      <SeccionInformacion/>
      <CarruselImagenes />
      <Footer/>

    </div>
  )
}

export default Home