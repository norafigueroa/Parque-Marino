import React, { useState, useEffect } from 'react';
import { getAnimal, deleteAnimal, putAnimal } from '../../services/ServicesAnimal';
import { getSpecie } from '../../services/ServicesSpecie';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './TarjetaAnimales.css';

function TarjetaAnimales() {
  const navegar = useNavigate();
  const { nombreEspecie } = useParams(); // Para usuario normal
  const [listaAnimales, setListaAnimales] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [listaEspecies, setListaEspecies] = useState([]);
  const [filtroEspecie, setFiltroEspecie] = useState(''); // Para admin
  const [modalAbierto, setModalAbierto] = useState(false);
  const [animalEditando, setAnimalEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', imagen: '', datoCurioso: '', especieId: '' });

  // Detectar tipo de usuario
  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  const esAdmin = usuario.tipoUsuario === 'admin';

  // Cargar animales y especies
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const animales = await getAnimal();
        const especies = await getSpecie();
        setListaEspecies(especies);

        if (!esAdmin) {
          // Usuario normal: filtrar por nombreEspecie
          const especie = especies.find(e => e.nombre === nombreEspecie);
          if (especie) {
            const filtrados = animales.filter(a => a.especieId === especie.id);
            setListaAnimales(filtrados);
          }
        } else {
          // Admin: mostrar todos los animales inicialmente
          setListaAnimales(animales);
        }
      } catch (error) {
        console.error('Error al cargar animales o especies:', error);
      }
    };
    cargarDatos();
  }, [nombreEspecie, esAdmin]);

  // Filtrar animales por especie para admin
  useEffect(() => {
    if (esAdmin && filtroEspecie !== '') {
      const filtrados = listaAnimales.filter(a => a.especieId === filtroEspecie);
      setListaFiltrada(filtrados);
    } else {
      setListaFiltrada(listaAnimales);
    }
  }, [filtroEspecie, listaAnimales, esAdmin]);

  // Volver a especies (solo para usuario normal)
  const volverAEspecies = () => {
    navegar('/Especies');
  };

  // Editar animal
  const manejarEditar = (animal) => {
    setAnimalEditando(animal);
    setFormData({ ...animal });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setAnimalEditando(null);
    setFormData({ nombre: '', descripcion: '', imagen: '', datoCurioso: '', especieId: '' });
  };

  const manejarCambioForm = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      await putAnimal(formData, animalEditando.id);
      const animalesActualizados = await getAnimal();
      setListaAnimales(animalesActualizados);
      cerrarModal();
      Swal.fire({ icon: 'success', title: '¡Actualizado!', text: 'El animal ha sido actualizado correctamente', confirmButtonColor: '#28a745' });
    } catch (error) {
      console.error('Error al actualizar el animal:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un problema al actualizar el animal', confirmButtonColor: '#dc3545' });
    }
  };

  const manejarEliminar = async (animal) => {
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el animal "${animal.nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      try {
        await deleteAnimal(animal.id);
        const animalesActualizados = await getAnimal();
        setListaAnimales(animalesActualizados);
        Swal.fire({ icon: 'success', title: '¡Eliminado!', text: 'El animal ha sido eliminado correctamente', confirmButtonColor: '#28a745' });
      } catch (error) {
        console.error('Error al eliminar el animal:', error);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un problema al eliminar el animal', confirmButtonColor: '#dc3545' });
      }
    }
  };

  return (
    <div className='contenedorAnimales'>
      {/* Botón volver a especies (solo usuario normal) */}
      {!esAdmin && (
        <div className="contenedorBotonVolver">
          <button onClick={volverAEspecies} className="botonRegresar">
            ← Volver a Especies
          </button>
        </div>
      )}

      {/* Botón agregar nuevo animal (solo admin) */}
      {esAdmin && (
        <div className="contenedorBotonAgregar">
          <button onClick={() => navegar('/AdminFormAnimal')} className="botonAgregarAnimal">
            + Agregar Nuevo Animal
          </button>
        </div>
      )}
      {/* Filtro admin */}
      {esAdmin && (
        <select value={filtroEspecie} onChange={(e) => setFiltroEspecie(e.target.value)}>
          <option value="">-- Filtrar por especie --</option>
          {listaEspecies.map(e => (
            <option key={e.id} value={e.id}>{e.nombre}</option>
          ))}
        </select>
      )}

      {/* Lista de animales */}
      <div className='contenedorGaleria'>
        {(esAdmin ? listaFiltrada : listaAnimales).map(animal => (
          <div key={animal.id} className='tarjetaAnimal' style={{ cursor: 'default' }}>
            <div className='columnaIzquierda'>
              <h3 className='nombreAnimal'>{animal.nombre}</h3>
              <img src={animal.imagen} alt={animal.nombre} className='imagenAnimal' />
            </div>
            <div className='columnaDerecha'>
              <p className='descripcionAnimal'>{animal.descripcion}</p>
              <p className='datoCuriosoAnimal'><strong>Dato curioso:</strong> {animal.datoCurioso}</p>

              {/* Botones admin */}
              {esAdmin && (
                <div className='accionesAdmin'>
                  <button className='editar' onClick={(e) => { e.stopPropagation(); manejarEditar(animal); }}>Editar</button>
                  <button className='eliminar' onClick={(e) => { e.stopPropagation(); manejarEliminar(animal); }}>Eliminar</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal edición */}
      {modalAbierto && (
        <div className='modalOverlay' onClick={cerrarModal}>
          <div className='modalContenido' onClick={(e) => e.stopPropagation()}>
            <h2 className='modalTitulo'>Editar Animal</h2>
            <div>
              <div className='modalCampo'>
                <label className='modalLabel'>Nombre:</label>
                <input type='text' name='nombre' value={formData.nombre} onChange={manejarCambioForm} required className='modalInput' />
              </div>
              <div className='modalCampo'>
                <label className='modalLabel'>Descripción:</label>
                <textarea name='descripcion' value={formData.descripcion} onChange={manejarCambioForm} required rows='4' className='modalTextarea' />
              </div>
              <div className='modalCampo'>
                <label className='modalLabel'>URL de Imagen:</label>
                <input type='text' name='imagen' value={formData.imagen} onChange={manejarCambioForm} required className='modalInput' />
              </div>
              <div className='modalCampo'>
                <label className='modalLabel'>Dato Curioso:</label>
                <input type='text' name='datoCurioso' value={formData.datoCurioso} onChange={manejarCambioForm} required className='modalInput' />
              </div>
              <div className='modalCampo'>
                <label className='modalLabel'>Especie:</label>
                <select name='especieId' value={formData.especieId} onChange={manejarCambioForm} required>
                  {listaEspecies.map(e => (
                    <option key={e.id} value={e.id}>{e.nombre}</option>
                  ))}
                </select>
              </div>
              <div className='modalBotones'>
                <button type='button' className='modalBotonCancelar' onClick={cerrarModal}>Cancelar</button>
                <button className='modalBotonGuardar' onClick={guardarEdicion}>Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </div>
  );
}

export default TarjetaAnimales;