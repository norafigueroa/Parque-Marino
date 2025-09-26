import React, { useState } from 'react'
import { postSpecie } from '../../services/ServicesSpecie'
import Swal from 'sweetalert2'

function FormularioEspecies() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [icono, setIcono] = useState('');

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
        <div>
            <h2>Formulario de Especies</h2>

            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" className="nombre" placeholder="Escribe el nombre de la especie" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <br /><br />

            <label htmlFor="descripcion">Descripción:</label>
            <textarea id="descripcion" className="descripcion" placeholder="Escribe una breve descripción de la especie" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
            <br /><br />

            <label htmlFor="icono">Ícono:</label>
            <input type="text" id="icono" className="icono" placeholder="Escribe el nombre o ruta del ícono" value={icono} onChange={(e) => setIcono(e.target.value)} />
            <br /><br />

            <button type="submit" onClick={manejarEnvio}>Guardar</button>

        </div>
    </div>
  )
}

export default FormularioEspecies