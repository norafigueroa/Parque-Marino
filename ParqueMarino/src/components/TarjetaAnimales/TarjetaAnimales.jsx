import React, { useState, useEffect } from 'react';
import { getAnimal } from '../../services/ServicesAnimal';
import { getSpecie } from '../../services/ServicesSpecie';
import { useParams, useNavigate } from 'react-router-dom';
import './TarjetaAnimales.css';

function TarjetaAnimales() {
  const navigate = useNavigate();
  
  const { nombreEspecie } = useParams(); // obtiene la especie desde la URL
  const [listaAnimales, setListaAnimales] = useState([]);
  const [idEspecie, setIdEspecie] = useState(null);

  useEffect(() => {
    const obtenerIdEspecie = async () => {
      try {
        const especies = await getSpecie();
        const especie = especies.find((e) => e.nombre === nombreEspecie);
        if (especie) setIdEspecie(especie.id);
      } catch (error) {
        console.error('Error al obtener la especie:', error);
      }
    };
    obtenerIdEspecie();
  }, [nombreEspecie]);

  useEffect(() => {
    const obtenerAnimales = async () => {
      try {
        const animales = await getAnimal();
        if (idEspecie) {
          const filtrados = animales.filter((a) => a.especieId === idEspecie);
          setListaAnimales(filtrados);
        }
      } catch (error) {
        console.error('Error al obtener los animales:', error);
      }
    };
    obtenerAnimales();
  }, [idEspecie]);

  return (
    <div>
        <button className="botonRegresar" onClick={() => navigate('/Especies')}>Regresar a especies</button>
        <div className="contenedorGaleria">
        {listaAnimales.map((animal) => (
            <div key={animal.id} className="tarjetaAnimal">
            <div className="columnaIzquierda">
                <h3 className="nombreAnimal">{animal.nombre}</h3>
                <img src={animal.imagen} alt={animal.nombre} className="imagenAnimal" />
            </div>
            <div className="columnaDerecha">
                <p className="descripcionAnimal">{animal.descripcion}</p>
                <p className="datoCuriosoAnimal"><strong>Dato curioso:</strong> {animal.datoCurioso}</p>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
}

export default TarjetaAnimales;
