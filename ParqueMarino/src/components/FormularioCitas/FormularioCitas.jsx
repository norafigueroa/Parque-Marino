import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { postReservation } from '../../services/ServicesReservation';
import './FormularioCitas.css';

function FormularioCitas() {
  const navigate = useNavigate();
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));
  const [fecha, setFecha] = useState(null);
  const [personas, setPersonas] = useState([
    { rangoEdad: '0', cantidad: 0 },
    { rangoEdad: '4', cantidad: 0 },
    { rangoEdad: '12', cantidad: 0 },
  ]);

  const cambiarCantidad = (index, valor) => {
    const nuevasPersonas = [...personas];
    nuevasPersonas[index].cantidad = parseInt(valor);
    setPersonas(nuevasPersonas);
  };

  const calcularTotal = () => {
    let total = 0;
    personas.forEach(p => {
      if (p.rangoEdad === '0') total += 0 * p.cantidad;
      else if (p.rangoEdad === '4') total += 1600 * p.cantidad;
      else if (p.rangoEdad === '12') total += 2900 * p.cantidad;
    });
    return total;
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const totalBoletos = personas.reduce((sum, p) => sum + p.cantidad, 0);

    if (!fecha) {
      Swal.fire('Error', 'Selecciona una fecha.', 'error');
      return;
    }

    if (fecha.getDay() === 1) {
      Swal.fire('Error', 'La fecha seleccionada no puede ser lunes.', 'error');
      return;
    }

    if (totalBoletos === 0) {
      Swal.fire('Error', 'Debes seleccionar al menos un boleto.', 'error');
      return;
    }

     const boletosAdulto = personas.find(p => p.rangoEdad === '12')?.cantidad || 0;
    if (boletosAdulto === 0) {
      Swal.fire('Error', 'Debes seleccionar al menos un boleto de adulto.', 'error');
      return;
    }

    if (totalBoletos > 30) {
      Swal.fire('Error', 'No puedes comprar más de 30 boletos.', 'error');
      return;
    }

    const boletos = {
      "0-3 años": personas.find(p => p.rangoEdad === '0')?.cantidad || 0,
      "4-11 años": personas.find(p => p.rangoEdad === '4')?.cantidad || 0,
      "12+ años": personas.find(p => p.rangoEdad === '12')?.cantidad || 0,
    };

    const reserva = {
      nombreUsuario: usuarioLogueado.nombre,
      idUsuario: usuarioLogueado.id,
      fecha: fecha.toISOString().split('T')[0],
      cantidadBoletos: totalBoletos,
      boletos,
      total: calcularTotal(),
      estado: 'pendiente'
    };

    try {
      await postReservation(reserva);
      Swal.fire('Éxito', 'Tu reserva se ha guardado correctamente.', 'success');
      navigate('/FormaPago', { state: { reserva } });
    } catch (err) {
      Swal.fire('Error', 'Hubo un problema al guardar la reserva.', 'error');
      console.error(err);
    }
  };

  const filtrarLunes = date => date.getDay() !== 1; // Devuelve false si es lunes

  return (
    <div>
      <div className='formularioCitas'>
        <h2>Formulario de Citas</h2>

        <label>Fecha de la cita:</label>
        <DatePicker
          selected={fecha}
          onChange={date => setFecha(date)}
          minDate={new Date()}
          filterDate={filtrarLunes}
          placeholderText="Selecciona una fecha"
          dateFormat="yyyy-MM-dd"
        />

        <h3>Selecciona cantidad de boletos por edad</h3>
        {personas.map((p, index) => (
          <div key={index}>
            <label> {p.rangoEdad === '0' ? '0-3 años (gratis)' : p.rangoEdad === '4' ? '4-11 años (₡1,600)' : '12+ años (₡2,900)'} </label>
            <input type="number" min="0" max="30" value={p.cantidad} onChange={e => cambiarCantidad(index, e.target.value)} />
          </div>
        ))}

        <p><strong>Total a pagar:</strong> ₡{calcularTotal()}</p>
        <button onClick={manejarSubmit}>Continuar a pago</button>

      </div>
    </div>
  );
}

export default FormularioCitas;
