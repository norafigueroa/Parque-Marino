import React, { useState, useEffect } from 'react';
import { getReservation, putReservation, deleteReservation } from '../../services/ServicesReservation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import './HistorialCitasAdmin.css';

function HistorialCitasAdmin() {
  const [todasLasCitas, setTodasLasCitas] = useState([]);
  const [citasFiltradas, setCitasFiltradas] = useState([]);
  const [vistaActiva, setVistaActiva] = useState('pendientes');
  
  // Filtros
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroBoletos, setFiltroBoletos] = useState('');

  // Modal de edición
  const [modalAbierto, setModalAbierto] = useState(false);
  const [citaEditando, setCitaEditando] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState(null);

  useEffect(() => {
    cargarCitas();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [todasLasCitas, vistaActiva, filtroNombre, filtroFecha, filtroBoletos]);

  const cargarCitas = async () => {
    try {
      const citas = await getReservation();
      setTodasLasCitas(citas);
    } catch (error) {
      console.error('Error al cargar las citas:', error);
    }
  };

  const aplicarFiltros = () => {
    let citasPorVista = todasLasCitas.filter(c => c.estado === vistaActiva.slice(0, -1));
    
    if (filtroNombre) {
      citasPorVista = citasPorVista.filter(c => 
        c.nombreUsuario.toLowerCase().includes(filtroNombre.toLowerCase())
      );
    }
    
    if (filtroFecha) {
      citasPorVista = citasPorVista.filter(c => c.fecha === filtroFecha);
    }
    
    if (filtroBoletos) {
      citasPorVista = citasPorVista.filter(c => 
        c.cantidadBoletos === parseInt(filtroBoletos)
      );
    }
    
    setCitasFiltradas(citasPorVista);
  };

  const cambiarEstado = async (cita, nuevoEstado) => {
    const textoEstado = nuevoEstado === 'completada' ? 'completada' : 'incumplida';
    const resultado = await Swal.fire({
      title: '¿Confirmar cambio?',
      text: `Se marcará la cita como ${textoEstado}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      try {
        const citaActualizada = { ...cita, estado: nuevoEstado };
        await putReservation(citaActualizada, cita.id);
        await cargarCitas();
        Swal.fire('¡Actualizado!', `La cita ha sido marcada como ${textoEstado}`, 'success');
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
        Swal.fire('Error', 'No se pudo actualizar el estado de la cita', 'error');
      }
    }
  };

  const abrirModalEdicion = (cita) => {
    setCitaEditando(cita);
    setNuevaFecha(new Date(cita.fecha + 'T00:00:00'));
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCitaEditando(null);
    setNuevaFecha(null);
  };

  const guardarEdicionFecha = async () => {
    if (!nuevaFecha) {
      Swal.fire('Error', 'Selecciona una fecha válida', 'error');
      return;
    }

    try {
      const fechaFormateada = nuevaFecha.toISOString().split('T')[0];
      const citaActualizada = { ...citaEditando, fecha: fechaFormateada };
      await putReservation(citaActualizada, citaEditando.id);
      await cargarCitas();
      cerrarModal();
      Swal.fire('¡Actualizado!', 'La fecha de la cita ha sido modificada', 'success');
    } catch (error) {
      console.error('Error al editar la cita:', error);
      Swal.fire('Error', 'No se pudo editar la cita', 'error');
    }
  };

  const eliminarCita = async (cita) => {
    const resultado = await Swal.fire({
      title: '¿Eliminar cita?',
      text: `Se eliminará la cita de ${cita.nombreUsuario}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      try {
        await deleteReservation(cita.id);
        await cargarCitas();
        Swal.fire('¡Eliminado!', 'La cita ha sido eliminada', 'success');
      } catch (error) {
        console.error('Error al eliminar la cita:', error);
        Swal.fire('Error', 'No se pudo eliminar la cita', 'error');
      }
    }
  };

  const limpiarFiltros = () => {
    setFiltroNombre('');
    setFiltroFecha('');
    setFiltroBoletos('');
  };


  return (
    <div>
        <div className="historialCitas">
      <h1 className="titulo">Gestión de Citas</h1>

      {/* Pestañas */}
      <div className="pestanas">
        <button 
          className={vistaActiva === 'pendientes' ? 'pestana activa' : 'pestana'}
          onClick={() => setVistaActiva('pendientes')}
        >
          Pendientes
        </button>
        <button 
          className={vistaActiva === 'completadas' ? 'pestana activa' : 'pestana'}
          onClick={() => setVistaActiva('completadas')}
        >
          Completadas
        </button>
        <button 
          className={vistaActiva === 'incumplidas' ? 'pestana activa' : 'pestana'}
          onClick={() => setVistaActiva('incumplidas')}
        >
          Incumplidas
        </button>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="inputFiltro"
        />
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="inputFiltro"
        />
        <input
          type="number"
          placeholder="Cantidad boletos"
          value={filtroBoletos}
          onChange={(e) => setFiltroBoletos(e.target.value)}
          className="inputFiltro"
        />
        <button onClick={limpiarFiltros} className="btnLimpiar">Limpiar filtros</button>
      </div>

      {/* Tabla */}
      <div className="contenedorTabla">
        <table className="tablaCitas">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Boletos</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.length === 0 ? (
              <tr>
                <td colSpan="5" className="sinDatos">No hay citas {vistaActiva}</td>
              </tr>
            ) : (
              citasFiltradas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.nombreUsuario}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.cantidadBoletos}</td>
                  <td>₡{cita.total}</td>
                  <td className="acciones">
                    {vistaActiva === 'pendientes' && (
                      <>
                        <button 
                          className="btnCompletar"
                          onClick={() => cambiarEstado(cita, 'completada')}
                        >
                          Completar
                        </button>
                        <button 
                          className="btnIncumplir"
                          onClick={() => cambiarEstado(cita, 'incumplida')}
                        >
                          Incumplida
                        </button>
                        <button 
                          className="btnEditar"
                          onClick={() => abrirModalEdicion(cita)}
                        >
                          Editar
                        </button>
                      </>
                    )}
                    <button 
                      className="btnEliminar"
                      onClick={() => eliminarCita(cita)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      {modalAbierto && (
        <div className="modalOverlay" onClick={cerrarModal}>
          <div className="modalContenido" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalTitulo">Editar Fecha de Cita</h2>
            
            <div className="modalInfo">
              <p><strong>Usuario:</strong> {citaEditando.nombreUsuario}</p>
              <p><strong>Fecha actual:</strong> {citaEditando.fecha}</p>
              <p><strong>Boletos:</strong> {citaEditando.cantidadBoletos}</p>
              <p><strong>Total:</strong> ₡{citaEditando.total}</p>
            </div>

            <div className="modalCampo">
              <label className="modalLabel">Nueva fecha:</label>
              <DatePicker
                selected={nuevaFecha}
                onChange={(date) => setNuevaFecha(date)}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                className="modalDatePicker"
              />
            </div>

            <div className="modalBotones">
              <button className="modalBotonCancelar" onClick={cerrarModal}>
                Cancelar
              </button>
              <button className="modalBotonGuardar" onClick={guardarEdicionFecha}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default HistorialCitasAdmin