import React, { useState, useEffect } from 'react'
import { getSpecie } from '../../services/ServicesSpecie';
import './TarjetaEspecie.css';

function TarjetaEspecie() {
  const [listaEspecies, setListaEspecies] = useState([]);

  useEffect(() => {
    const obtenerEspecies = async () => {
      try {
        const datos = await getSpecie();
        setListaEspecies(datos);
      } catch (error) {
        console.error('Error al obtener las especies:', error);
      }
    };
    obtenerEspecies();
  }, []);

  
  return (
    <div>
       <div className="contenedorTarjetas">
      {listaEspecies.map((especie) => (
        <div key={especie.id} className="tarjeta">
          <img src={especie.icono} alt={especie.nombre} className="imagenTarjeta" />
          <h3>{especie.nombre}</h3>
          <p>{especie.descripcion}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default TarjetaEspecie