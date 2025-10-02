import React, { useState, useEffect }  from 'react'
import Swal from 'sweetalert2';
import { postAnimal } from '../../services/ServicesAnimal';
import { getSpecie } from '../../services/ServicesSpecie';
import { useNavigate } from 'react-router-dom';
import './FormularioAnimales.css';

function FormularioAnimales() {
  const navegar = useNavigate();
  const [especieId, setEspecieId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [datoCurioso, setDatoCurioso] = useState('');

  const [especies, setEspecies] = useState([]); // Guardar especies

  // Cargar especies al montar el componente
  useEffect(() => {
    const cargarEspecies = async () => {
      try {
        const data = await getSpecie();
        setEspecies(data); // Guardamos todas las especies
      } catch (error) {
        console.error('Error al cargar especies:', error);
      }
    };
    cargarEspecies();
  }, []);

    const manejarVolver = () => {
      navigate('/AdminAnimales')
    };

  const manejarGuardar = async () => {
    if (!especieId || !nombre.trim() || !descripcion.trim() || !imagen.trim() || !datoCurioso.trim()) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    const nuevoAnimal = { especieId, nombre, descripcion, imagen, datoCurioso };

    try {
      await postAnimal(nuevoAnimal);
      Swal.fire('Éxito', 'Animal agregado correctamente', 'success');

      setEspecieId('');
      setNombre('');
      setDescripcion('');
      setImagen('');
      setDatoCurioso('');
    } catch (error) {
      console.error('Error al agregar animal:', error);
      Swal.fire('Error', 'No se pudo agregar el animal', 'error');
    }
  };


  return (
    <div>
        <div className='FormAnimal'>
            <h2 className='tituloAnimal'>Formulario de animales</h2>

            <button className='botonRegresarAnimal' type="button" onClick={manejarVolver}> ← Volver a Animales </button>

            <label className='labelAnimal' htmlFor="especiesId">Especie:</label>
              <select
                id="especieId" value={especieId} onChange={(e) => setEspecieId(e.target.value)}> <option value="">Seleccione una especie</option> {especies.map((esp) => ( <option key={esp.id} value={esp.id}> {esp.nombre}</option>))}
              </select>
            <br /><br />

            <label className='labelanimal' htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Escribe el nombre del animal" />
            <br />
            <label className='labelanimal' htmlFor="descripcion">Descripción:</label>
            <textarea className='textarea' id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Escribe una breve descripción"></textarea>
            <br /><br />

            <label className='labelanimal' htmlFor="imagen">Imagen:</label>
            <input type="text" id="imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="Ruta o URL de la imagen" />
            <br /><br />

            <label className='labelanimal' htmlFor="datoCurioso">Dato Curioso:</label>
            <textarea id="datoCurioso" value={datoCurioso} onChange={(e) => setDatoCurioso(e.target.value)} placeholder="Agrega un dato curioso"></textarea>
            <br /><br />

            <button className='guardarAnimal' type="submit" onClick={manejarGuardar}>Guardar</button>
            

        </div>
    </div>
  )
}

export default FormularioAnimales