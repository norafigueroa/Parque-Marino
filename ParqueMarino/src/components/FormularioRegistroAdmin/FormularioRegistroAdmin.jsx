import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { postUsers } from '../../services/ServicesUser';

function FormularioRegistroAdmin () {
    const [nombre, setNombre] = useState('');
      const [correo, setCorreo] = useState('');
      const [contrasena, setContrasena] = useState('');
    
      const manejarRegistro = async () => {
        if (!nombre.trim() || !correo.trim() || !contrasena.trim()) {
          await Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
          return;
        }
    
        try {
          await postUsers({
            nombre,
            correo,
            contrasena,
            tipoUsuario: "admin",
          });
          await Swal.fire('Éxito', 'Administrador registrado correctamente', 'success');
          setNombre('');
          setCorreo('');
          setContrasena('');
        } catch (error) {
          console.error(error);
          await Swal.fire('Error', 'No se pudo registrar el administrador', 'error');
        }
      };


  return (
    <div>
        <div className="tarjetaRegistro">
            <h2>Registrar Administrador</h2>
            
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

            <label htmlFor="correo">Correo:</label>
            <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />

            <label htmlFor="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />

            <button onClick={manejarRegistro}>Registrar</button>
        </div>
    </div>
  )
}

export default FormularioRegistroAdmin 