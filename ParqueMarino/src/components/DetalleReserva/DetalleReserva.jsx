import React, { useState, useEffect } from 'react';
import { getReservation } from '../../services/ServicesReservation';
import QRCode from 'react-qr-code';
import Swal from 'sweetalert2';
import './DetalleReserva.css';

function DetalleReserva() {
  const [reservasUsuario, setReservasUsuario] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const todasLasReservas = await getReservation();
      const reservasFiltradas = todasLasReservas.filter(
        r => r.idUsuario === usuarioLogueado.id
      );
      setReservasUsuario(reservasFiltradas);
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
      Swal.fire('Error', 'No se pudieron cargar tus reservas', 'error');
    }
  };

  const abrirModal = (reserva) => {
    setReservaSeleccionada(reserva);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setReservaSeleccionada(null);
  };

  const obtenerColorEstado = (estado) => {
    switch(estado) {
      case 'pendiente': return '#ffc107';
      case 'completada': return '#28a745';
      case 'incumplida': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const obtenerTextoEstado = (estado) => {
    switch(estado) {
      case 'pendiente': return 'Pendiente';
      case 'completada': return 'Completada';
      case 'incumplida': return 'Incumplida';
      default: return 'Desconocido';
    }
  };

  // Generar contenido del QR: formato JSON con datos clave
  const generarContenidoQR = (reserva) => {
    const datosQR = {
      id: reserva.id,
      usuario: reserva.nombreUsuario,
      fecha: reserva.fecha,
      boletos: reserva.cantidadBoletos,
      total: reserva.total,
      estado: reserva.estado
    };
    return JSON.stringify(datosQR);
  };


  return (
    <div>
        <div className="historialUsuario">
      <h1 className="tituloHistorial">Mis Reservas</h1>

      {reservasUsuario.length === 0 ? (
        <div className="sinReservas">
          <p>No tienes reservas registradas</p>
        </div>
      ) : (
        <div className="contenedorTablaUsuario">
          <table className="tablaReservas">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Boletos</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {reservasUsuario.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.fecha}</td>
                  <td>{reserva.cantidadBoletos}</td>
                  <td>₡{reserva.total}</td>
                  <td>
                    <span 
                      className="estadoBadge"
                      style={{ backgroundColor: obtenerColorEstado(reserva.estado) }}
                    >
                      {obtenerTextoEstado(reserva.estado)}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btnVerDetalle"
                      onClick={() => abrirModal(reserva)}
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal con detalle y QR */}
      {modalAbierto && reservaSeleccionada && (
        <div className="overlayModal" onClick={cerrarModal}>
          <div className="contenidoModal" onClick={(e) => e.stopPropagation()}>
            <button className="btnCerrarModal" onClick={cerrarModal}>✕</button>

            <div className="tarjetaConfirmacion">
              <h2 className="tituloModal">Detalle de Reserva</h2>
              
              <div 
                className="bannerEstado"
                style={{ backgroundColor: obtenerColorEstado(reservaSeleccionada.estado) }}
              >
                <h3>Estado: {obtenerTextoEstado(reservaSeleccionada.estado)}</h3>
              </div>

              <div className="seccionQR">
                <QRCode 
                  value={generarContenidoQR(reservaSeleccionada)}
                  size={200}
                />
                <p className="textoQR">Código de verificación</p>
              </div>

              <div className="datosReserva">
                <div className="filaInfo">
                  <span className="etiqueta">Usuario:</span>
                  <span className="valor">{reservaSeleccionada.nombreUsuario}</span>
                </div>
                <div className="filaInfo">
                  <span className="etiqueta">Fecha de visita:</span>
                  <span className="valor">{reservaSeleccionada.fecha}</span>
                </div>
                <div className="filaInfo">
                  <span className="etiqueta">Cantidad de boletos:</span>
                  <span className="valor">{reservaSeleccionada.cantidadBoletos}</span>
                </div>
                <div className="filaInfo">
                  <span className="etiqueta">Total pagado:</span>
                  <span className="valor">₡{reservaSeleccionada.total}</span>
                </div>
              </div>

              <div className="desgloseBoletos">
                <h4>Desglose de boletos:</h4>
                <ul>
                  {Object.entries(reservaSeleccionada.boletos).map(([rango, cantidad]) => (
                    <li key={rango}>
                      <strong>{rango}:</strong> {cantidad} boleto(s)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default DetalleReserva