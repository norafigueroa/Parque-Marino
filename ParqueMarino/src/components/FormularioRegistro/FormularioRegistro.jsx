import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postUsers, getUsers } from '../../services/ServicesUser';
import Swal from 'sweetalert2';

function FormularioRegistro() {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const navigate = useNavigate();

  const manejarRegistro = async () => {
    // 1. Validar campos vacíos
    if (!nombre.trim() || !correo.trim() || !contrasena.trim() || !confirmar.trim()) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    // 2. Validar longitud del nombre
    if (nombre.trim().length < 3) {
      Swal.fire('Error', 'El nombre debe tener al menos 3 caracteres', 'error');
      return;
    }

    // 3. Validar email
    const validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validarEmail.test(correo.trim())) {
      Swal.fire('Error', 'Ingrese un correo válido', 'error');
      return;
    }

    // 4. Validar longitud de la contraseña
    if (contrasena.trim().length < 8) {
      Swal.fire('Error', 'La contraseña debe tener al menos 8 caracteres', 'error');
      return;
    }

    // 5. Validar que las contraseñas coincidan
    if (contrasena !== confirmar) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    // 6. Validar usuario único
    try {
      const usuariosExistentes = await getUsers();
      const correoExiste = usuariosExistentes.some(
        u => u.correo.toLowerCase() === correo.trim().toLowerCase()
      );
      if (correoExiste) {
        Swal.fire('Error', 'Ya existe un usuario con ese correo', 'error');
        return;
      }
    } catch (error) {
      console.error('Error al verificar usuarios existentes', error);
      Swal.fire('Error', 'Error al validar el correo', 'error');
      return;
    }

    // 7. Crear nuevo usuario
    const nuevoUsuario = { 
      nombre, 
      correo, 
      contrasena,
      tipoUsuario: "usuario"
     };
    try {
      await postUsers(nuevoUsuario);
      await Swal.fire('Éxito', 'Usuario agregado con éxito', 'success');

      navigate('/Login');

      // Limpiar campos
      setNombre('');
      setCorreo('');
      setContrasena('');
      setConfirmar('');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo crear el usuario', 'error');
    }
  };


  return (
    <div>
        <div>
            <h2>Registro</h2>

            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id='nombre' className='nombre' placeholder="Escribe un nombre y un apellido" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <br /><br />

            <label htmlFor="correo">Correo:</label>
            <input type="email" id='correo' className='correo' placeholder="ej: juan@gmail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <br /><br />

            <label htmlFor="contrasena">Contraseña:</label>
            <input type="password" id='contrasena' className='contrasena' placeholder="Escribe tu contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            <br /><br />

            <label htmlFor="confirmar">Confirmar Contraseña:</label>
            <input type="password" id='confirmar' className='confirmar' placeholder="Vuelve a escribir tu contraseña" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
            <br /><br />

            <button id="registrarse" onClick={manejarRegistro}>Registrarse</button> <br /><br />

            <Link to="/Login">Ya tengo cuenta</Link>
          
        </div>
    </div>
  )
}

export default FormularioRegistro