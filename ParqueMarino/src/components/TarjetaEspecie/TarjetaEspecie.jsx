import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSpecie, deleteSpecie, putSpecie } from '../../services/ServicesSpecie';
import Swal from 'sweetalert2';
import './TarjetaEspecie.css';

function TarjetaEspecie() {
  const navegar = useNavigate();

  // Detectar tipo de usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
  const isAdmin = usuario.tipoUsuario === 'admin';

  const [listaEspecies, setListaEspecies] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [especieEditando, setEspecieEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    icono: ''
  });

  // Obtener especies al cargar el componente
  useEffect(() => {
    cargarEspecies();
  }, []);

  const cargarEspecies = async () => {
    try {
      const datos = await getSpecie();
      setListaEspecies(datos);
    } catch (error) {
      console.error('Error al obtener las especies:', error);
    }
  };

  // Manejar click en la tarjeta según tipo de usuario
  const manejarClick = (especie) => {
    if (!isAdmin) {
      // Usuario normal navega a la página de animales
      navegar(`/especies/${especie.nombre}`);
    }
    // Admin no navega, solo puede usar los botones de editar/eliminar
  };

  // Abrir modal de edición
  const manejarEditar = (especie) => {
    setEspecieEditando(especie);
    setFormData({
      nombre: especie.nombre,
      descripcion: especie.descripcion,
      icono: especie.icono
    });
    setModalAbierto(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setEspecieEditando(null);
    setFormData({ nombre: '', descripcion: '', icono: '' });
  };

  // Manejar cambios en el formulario
  const manejarCambioForm = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Guardar cambios de edición
  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      await putSpecie(formData, especieEditando.id);
      await cargarEspecies(); // Recargar lista actualizada
      cerrarModal();
      
      // SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'La especie ha sido actualizada correctamente',
        confirmButtonColor: '#28a745'
      });
    } catch (error) {
      console.error('Error al actualizar la especie:', error);
      
      // SweetAlert de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar la especie',
        confirmButtonColor: '#dc3545'
      });
    }
  };

  // Eliminar especie
  const manejarEliminar = async (especie) => {
    // SweetAlert de confirmación
    const resultado = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará la especie "${especie.nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      try {
        await deleteSpecie(especie.id);
        await cargarEspecies(); // Recargar lista actualizada
        
        // SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'La especie ha sido eliminada correctamente',
          confirmButtonColor: '#28a745'
        });
      } catch (error) {
        console.error('Error al eliminar la especie:', error);
        
        // SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar la especie',
          confirmButtonColor: '#dc3545'
        });
      }
    }
  };

  // Navegar a formulario de agregar especie
  const agregarNuevaEspecie = () => {
    navegar('/AdminFormEspecie');
  };

  return (
    <div>
      <div className='contenedorPrincipal'>
        {/* Botón agregar nueva especie (solo admin) */}
        {isAdmin && (
          <div className="contenedorBotonAgregar">
            <button onClick={agregarNuevaEspecie} className="botonAgregarEspecie"> + Agregar Nueva Especie </button>
          </div>
        )}

        {/* Contenedor de tarjetas */}
        <div className="contenedorTarjetas">
          {listaEspecies.map((especie) => (
            <div 
              key={especie.id} className="tarjetaEspecie" onClick={() => manejarClick(especie)} style={{ cursor: isAdmin ? 'default' : 'pointer' }} >
              <img src={especie.icono} alt={especie.nombre} className="imagenTarjeta" />
              <h3>{especie.nombre}</h3>
              <p>{especie.descripcion}</p>

              {/* Botones de admin */}
              {isAdmin && (
                <div className="tarjetaFooter">
                  <div className="accionesAdmin">
                    <button className="editar" onClick={(e) => { e.stopPropagation(); manejarEditar(especie); }} > Editar </button>
                    <button className="eliminar" onClick={(e) => { e.stopPropagation(); manejarEliminar(especie); }} > Eliminar </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
          </div>
            {/* Modal de edición */}
            {modalAbierto && (
              <div className="modalOverlay" onClick={cerrarModal}>
                <div className="modalContenido" onClick={(e) => e.stopPropagation()}>
                  <h2 className="modalTitulo">Editar Especie</h2>
                  <form onSubmit={guardarEdicion}>
                    <div className="modalCampo">
                      <label className="modalLabel">Nombre:</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={manejarCambioForm}
                        required
                        className="modalInput"
                      />
                    </div>

                    <div className="modalCampo">
                      <label className="modalLabel">Descripción:</label>
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={manejarCambioForm}
                        required
                        rows="4"
                        className="modalTextarea"
                      />
                    </div>

                    <div className="modalCampo">
                      <label className="modalLabel">URL del Icono:</label>
                      <input
                        type="text"
                        name="icono"
                        value={formData.icono}
                        onChange={manejarCambioForm}
                        required
                        className="modalInput"
                      />
                    </div>

                    <div className="modalBotones">
                      <button
                        type="button"
                        onClick={cerrarModal}
                        className="modalBotonCancelar"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="modalBotonGuardar"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          )}
    </div>
  );
}

export default TarjetaEspecie;