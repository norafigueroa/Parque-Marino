import React, { useState } from 'react'
import { postSpecie } from '../../services/ServicesSpecie'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './FormularioEspecies.css'

function FormularioEspecies() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [icono, setIcono] = useState('');

  const navigate = useNavigate();

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    // Validar campos vacíos
    if (!nombre.trim() || !descripcion.trim() || !icono.trim()) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    const nuevaEspecie = {
      nombre,
      descripcion,
      icono
    };

    try {
      await postSpecie(nuevaEspecie);
      Swal.fire('Éxito', 'Especie guardada correctamente ✅', 'success');
      
      // limpiar campos
      setNombre('');
      setDescripcion('');
      setIcono('');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar la especie ❌', 'error');
    }
  };


  return (
    <div>
      <div className="contenedorFormulario">
         <button className='regresarEspecies' type="button" onClick={() => navigate('/AdminEspecies')}>Regresar</button>

          <div className='formEspecie'>
              <h2 className='tituloEspecie'>Formulario de Especies</h2>

              <label className='labelEspecie' htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" className="nombre" placeholder="Escribe el nombre de la especie" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <br /><br />

              <label className='labelEspecie' htmlFor="descripcion">Descripción:</label>
              <textarea id="descripcion" className="descripcion" placeholder="Escribe una breve descripción de la especie" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
              <br /><br />

              <label className='labelEspecie' htmlFor="icono">Ícono:</label>
              <input type="text" id="icono" className="icono" placeholder="Escribe el nombre o ruta del ícono" value={icono} onChange={(e) => setIcono(e.target.value)} />
              <br /><br />

              <button className='guardarEspecie' type="submit" onClick={manejarEnvio}>Guardar</button>

          </div>
      </div>
    </div>
  )
}

export default FormularioEspecies