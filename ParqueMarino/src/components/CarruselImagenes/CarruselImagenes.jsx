import React, { useState } from 'react';
import './CarruselImagenes.css';

function CarruselImagenes() {
  const imagenes = [
    'https://www.thecleanwave.org/wp-content/uploads/2023/10/1.jpg',
    'https://presidencia.gobiernocarlosalvarado.cr/wp-content/uploads/2020/11/Foto-4.jpeg',
    'https://www.nacion.com/resizer/v2/Y437XGCV2ZHBNFASTSQG27CIFI.jpg?smart=true&auth=6a7740d6576e4476b08a0d78be03bfb26cb96d30cae98c64012602c3dd526906&width=4318&height=2794',
    'https://www.nacion.com/resizer/v2/5RQV7FFX7VCJHET3ZEOMUD2I3A.jpg?smart=true&auth=36df4e6b4cfb3d2a2f6e66a6e170a781278809cb9f4e23c7c302835270eac767&width=1440&height=931'
  ];

  const [indiceActual, setIndiceActual] = useState(0);

  const cambiarImagen = (indice) => {
    setIndiceActual(indice);
  };

  return (
    <div className="contenedorCarrusel">
      <div className="carrusel">
        <img 
          src={imagenes[indiceActual]} 
          alt={`Parque Marino ${indiceActual + 1}`}
          className="imagenCarrusel"
        />
      </div>

      <div className="puntosIndicadores">
        {imagenes.map((_, indice) => (
          <span
            key={indice}
            className={`punto ${indice === indiceActual ? 'puntoActivo' : ''}`}
            onClick={() => cambiarImagen(indice)}
          />
        ))}
      </div>
    </div>
  );
}

export default CarruselImagenes;