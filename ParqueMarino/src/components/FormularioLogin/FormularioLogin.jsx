import React, { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getUsers } from '../../services/ServicesUser';
import './FormularioLogin.css';

function FormularioLogin() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioLocal) {
      setUsuario(usuarioLocal);
      Swal.fire('Aviso', 'Ya has iniciado sesión', 'info');
      //Redirigir directamente al Home
      navigate('/');
    }
  }, [navigate]);

  const manejarLogin = async () => {
    if (!correo.trim() || !contrasena.trim()) {
      await Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      const usuarios = await getUsers();
      const usuarioEncontrado = usuarios.find((u) =>
          u.correo.toLowerCase() === correo.trim().toLowerCase() &&
          u.contrasena === contrasena.trim()
      );

      if (usuarioEncontrado) {
        localStorage.setItem('usuario', JSON.stringify({
            id: usuarioEncontrado.id,
            nombre: usuarioEncontrado.nombre,
            correo: usuarioEncontrado.correo,
            tipoUsuario: usuarioEncontrado.tipoUsuario,
          })
        );
        
      
        await Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');

       // Redirección condicional según tipo de usuario
      if (usuarioEncontrado.tipoUsuario === 'admin') {
        navigate('/HomeAdmin'); // Admin va al HomeAdmin
      } else {
        navigate('/'); // Usuario normal va al Home
      }

      // Limpiar campos del formulario
      setCorreo('');
      setContrasena('');

    } else {
      await Swal.fire('Error', 'Correo o contraseña incorrectos', 'error');
    }
  } catch (error) {
    console.error('Error al verificar usuarios', error);
    await Swal.fire('Error', 'No se pudo iniciar sesión', 'error');
  }
};

 if (usuario) return null;  // Si ya hay sesión, no mostrar formulario


  return (
    <div>
      <div className='tarjetaLogin'>
      <h2>Inicio de Sesión</h2>

      <label htmlFor="correo">Correo:</label>
      <input type="email" id="correo" className="correo" placeholder="ej: juan@gmail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />

      <br /><br />

      <label htmlFor="contrasena">Contraseña:</label>
      <input type="password" id="contrasena" className="contrasena" placeholder="Ingrese tu contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />

      <br /><br />

      <button className="ingresar" onClick={manejarLogin}>Ingresar</button>
      <br /><br />
      <Link to="/Register">¿No tienes cuenta? Registrate</Link>
    </div>

    </div>
  )
}

export default FormularioLogin