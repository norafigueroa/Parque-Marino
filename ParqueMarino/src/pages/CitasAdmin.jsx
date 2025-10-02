import React from 'react'

import Header from '../components/Header/Header';
import MenuAdmin from '../components/MenuAdmin/MenuAdmin';
import HistorialCitasAdmin from '../components/HistorialCitasAdmin/HistorialCitasAdmin';
import Footer from '../components/Footer/Footer';

function CitasAdmin() {
  return (
    <div>
      <Header/>
      <MenuAdmin />
      <HistorialCitasAdmin/>
      <Footer/> 
    </div>
  )
}

export default CitasAdmin