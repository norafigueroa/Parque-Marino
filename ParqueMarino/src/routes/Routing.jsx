import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Animales from '../pages/Animales';
import AdminAnimales from '../pages/AdminAnimales';
import AdminEspecies from '../pages/AdminEspecies';
import AdminFormEspecie from '../pages/AdminFormEspecie';
import AdminFormAnimal from '../pages/AdminFormAnimal';
import Citas from '../pages/Citas';
import CitasAdmin from '../pages/CitasAdmin';
import Contacto from '../pages/Contacto';
import Especies from '../pages/Especies';
import FormaPago from '../pages/FormaPago';
import HistorialCitas from '../pages/HistorialCitas';
import HomeAdmin from '../pages/HomeAdmin';
import Juego from '../pages/Juego';
import Login from '../pages/Login';
import OpinionesUsuarios from '../pages/OpinionesUsuarios';
import Register from '../pages/Register';
import RegisterAdmin from '../pages/RegisterAdmin';
import SobreNosotros from '../pages/SobreNosotros';

import PrivateRouteUser from './PrivateRoutesUser';
import PrivateRouteAdmin from './PrivateRoutesAdmin';



function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/especies/:nombreEspecie" element={<Animales />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Especies" element={<Especies />} />
          <Route path="/Juego" element={<Juego />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/SobreNosotros" element={<SobreNosotros />} />

          {/* Privadas de Usuario */}
          <Route path="/Citas" element={<PrivateRouteUser><Citas /></PrivateRouteUser>} />
          <Route path="/HistorialCitas" element={<PrivateRouteUser><HistorialCitas /></PrivateRouteUser>} />
          <Route path="/FormaPago" element={<PrivateRouteUser><FormaPago /></PrivateRouteUser>} />


          {/* Privadas de Admin */}
          <Route path="/HomeAdmin" element={<PrivateRouteAdmin><HomeAdmin /></PrivateRouteAdmin>} />
          <Route path="/AdminAnimales" element={<PrivateRouteAdmin><AdminAnimales /></PrivateRouteAdmin>} />
          <Route path="/AdminEspecies" element={<PrivateRouteAdmin><AdminEspecies /></PrivateRouteAdmin>} />
          <Route path="/AdminFormEspecie" element={<PrivateRouteAdmin><AdminFormEspecie /></PrivateRouteAdmin>} />
          <Route path="/AdminFormAnimal" element={<PrivateRouteAdmin><AdminFormAnimal /></PrivateRouteAdmin>} />
          <Route path="/CitasAdmin" element={<PrivateRouteAdmin><CitasAdmin /></PrivateRouteAdmin>} />
          <Route path="/OpinionesUsuarios" element={<PrivateRouteAdmin><OpinionesUsuarios /></PrivateRouteAdmin>} />
          <Route path="/RegisterAdmin" element={<PrivateRouteAdmin><RegisterAdmin /></PrivateRouteAdmin>} />
        </Routes>
      </Router>
          
    </div>
  )
}

export default Routing