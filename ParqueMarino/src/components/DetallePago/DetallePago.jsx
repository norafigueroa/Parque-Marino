import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getReservation } from "../../services/ServicesReservation";

function DetallePago() {
  const location = useLocation();
  const reservaEnviada = location.state?.reserva;
  const [reserva, setReserva] = useState(null);

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

  return (
    <div className="detalle-pago">
      <h2>Resumen de la Reserva</h2>
      <p><strong>Usuario:</strong> {reserva.nombreUsuario}</p>
      <p><strong>Fecha:</strong> {reserva.fecha}</p>
      <p><strong>Cantidad de boletos:</strong> {reserva.cantidadBoletos}</p>
      <p><strong>Total:</strong> ₡{reserva.total}</p>

      <h3>Detalle de boletos</h3>
      <ul>
        {Object.entries(reserva.boletos).map(([rango, cantidad], idx) => (
          <li key={idx}>
            {rango}: {cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetallePago;
