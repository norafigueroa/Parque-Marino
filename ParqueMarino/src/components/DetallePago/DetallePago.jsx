import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getReservation } from "../../services/ServicesReservation";
import { getCard } from "../../services/ServicesCard";
import Swal from "sweetalert2";
import './DetallePago.css';


function DetallePago() {
  const navigate = useNavigate();
  const location = useLocation();
  const reservaEnviada = location.state?.reserva;
  const [reserva, setReserva] = useState(null);

  // Estados de los inputs
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [cvv, setCvv] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  useEffect(() => {
    const cargarReserva = async () => {
      try {
        if (reservaEnviada?.id) {
          const reservas = await getReservation();
          const encontrada = reservas.find(r => r.id === reservaEnviada.id);
          setReserva(encontrada || reservaEnviada);
        } else {
          setReserva(reservaEnviada);
        }
      } catch (error) {
        console.error("Error al cargar la reserva:", error);
      }
    };

    cargarReserva();
  }, [reservaEnviada]);

  if (!reserva) {
    return <p>No hay información de reserva disponible.</p>;
  }

  // Función para procesar el pago
  const manejarPago = async () => {
    // 1️⃣ Validación de campos vacíos
    if (!numeroTarjeta.trim() || !cvv.trim() || !fechaVencimiento.trim()) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    try {
      const tarjetas = await getCard();
      const usuarioTarjeta = tarjetas.find(
        t =>
          t.usuarioId === reserva.idUsuario &&
          t.numeroTarjeta === numeroTarjeta.trim() &&
          t.cvv === cvv.trim() &&
          t.fechaVencimiento === fechaVencimiento.trim()
      );

      // 2️⃣ Validación de datos correctos
      if (!usuarioTarjeta) {
        Swal.fire("Error", "Datos de tarjeta incorrectos. Verifique la información.", "error");
        return;
      }

      // 3️⃣ Pago exitoso
      Swal.fire("✅ Pago realizado con éxito", "¡Gracias por su compra!", "success");
      
      // Redirigir a HistorialCitas
      navigate("/HistorialCitas");
    } catch (error) {
      console.error("Error al validar la tarjeta:", error);
      Swal.fire("Error", "Hubo un problema al procesar el pago.", "error");
    }
  };

  return (
    <div>
      <div className="contenedorPago">
        
        <div className="tarjetaResumen">
          <h2 className="titulo">Resumen de la Reserva</h2>
          <div className="infoReserva">
            <p><strong>Usuario:</strong> {reserva.nombreUsuario}</p>
            <p><strong>Fecha:</strong> {reserva.fecha}</p>
            <p><strong>Cantidad de boletos:</strong> {reserva.cantidadBoletos}</p>
            <p><strong>Total:</strong> ₡{reserva.total}</p>
          </div>

          <h3 className="subtitulo">Detalle de boletos</h3>
          <ul className="listaBoletos">
            {Object.entries(reserva.boletos).map(([rango, cantidad], idx) => (
              <li key={idx}>{rango}: {cantidad}</li>
            ))}
          </ul>
        </div>

        <div className="formularioPago">
          <h2 className="titulo">Datos de Pago</h2>
          
          <div className="fila">
            <div className="campo">
              <label>Nombre del titular:</label>
              <input type="text" value={reserva.nombreUsuario} disabled />
            </div>
            <div className="campo">
              <label>Código de seguridad (CVV):</label>
              <input type="text" placeholder="123" maxLength="3" value={cvv} onChange={e => setCvv(e.target.value)} />
            </div>
          </div>

          <div className="fila">
            <div className="numero">
              <label>Número de Tarjeta:</label>
              <input type="text" placeholder="1234567890123456" maxLength="16" value={numeroTarjeta} onChange={e => setNumeroTarjeta(e.target.value)} />
            </div>
          </div>

          <div className="fila">
            <div className="fecha">
              <label>Fecha de expiración:</label>
              <input type="text" placeholder="MM/AA" maxLength="5"value={fechaVencimiento} onChange={e => setFechaVencimiento(e.target.value)} />
            </div>
            <div className="logos">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" />
            </div>
          </div>

          <div className="fila">
            <button className="btnPagar" onClick={manejarPago}>Pagar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallePago;
