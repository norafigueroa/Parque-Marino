import React, { useState, useEffect } from 'react';
import './JuegoMemoria.css';

const JuegoMemoria = () => {
  const todosLosAnimales = [
    { id: 1, emoji: '🐠', nombre: 'Pez Tropical' },
    { id: 2, emoji: '🐡', nombre: 'Pez Globo' },
    { id: 3, emoji: '🦈', nombre: 'Tiburón' },
    { id: 4, emoji: '🐙', nombre: 'Pulpo' },
    { id: 5, emoji: '🦀', nombre: 'Cangrejo' },
    { id: 6, emoji: '🐢', nombre: 'Tortuga' },
    { id: 7, emoji: '🦑', nombre: 'Calamar' },
    { id: 8, emoji: '🐚', nombre: 'Concha' },
    { id: 9, emoji: '🦞', nombre: 'Langosta' },
    { id: 10, emoji: '🐟', nombre: 'Pez' }
  ];

  const [cartas, setCartas] = useState([]);
  const [cartasVolteadas, setCartasVolteadas] = useState([]);
  const [parejasEncontradas, setParejasEncontradas] = useState([]);
  const [intentos, setIntentos] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const barajarArray = (array) => {
    const nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
  };

  const iniciarJuego = () => {
    const animalesBarajados = barajarArray(todosLosAnimales);
    const animalesSeleccionados = animalesBarajados.slice(0, 6);
    const parejas = [...animalesSeleccionados, ...animalesSeleccionados];
    const cartasConIds = parejas.map((animal, index) => ({
      ...animal,
      cartaId: index,
      idOriginal: animal.id
    }));
    const cartasBarajadas = barajarArray(cartasConIds);
    
    setCartas(cartasBarajadas);
    setCartasVolteadas([]);
    setParejasEncontradas([]);
    setIntentos(0);
    setJuegoTerminado(false);
  };

  useEffect(() => {
    iniciarJuego();
  }, []);

  useEffect(() => {
    if (cartasVolteadas.length === 2) {
      const [primera, segunda] = cartasVolteadas;
      
      if (cartas[primera].idOriginal === cartas[segunda].idOriginal) {
        setParejasEncontradas([...parejasEncontradas, cartas[primera].idOriginal]);
        setCartasVolteadas([]);
      } else {
        setTimeout(() => {
          setCartasVolteadas([]);
        }, 1000);
      }
      setIntentos(intentos + 1);
    }
  }, [cartasVolteadas]);

  useEffect(() => {
    if (parejasEncontradas.length === 6 && cartas.length > 0) {
      setJuegoTerminado(true);
    }
  }, [parejasEncontradas]);

  const manejarClickCarta = (index) => {
    if (cartasVolteadas.length === 2 || 
        cartasVolteadas.includes(index) || 
        parejasEncontradas.includes(cartas[index].idOriginal)) {
      return;
    }
    setCartasVolteadas([...cartasVolteadas, index]);
  };

  const esCartaVolteada = (index) => {
    return cartasVolteadas.includes(index) || 
           parejasEncontradas.includes(cartas[index].idOriginal);
  };

  return (
    <div className="juego-memoria-container">
      <div className="juego-memoria-wrapper">
        <h1 className="juego-memoria-titulo">Memoria Marina</h1>
        
        <div className="juego-memoria-stats">
          <p className="juego-memoria-stat">Intentos: {intentos}</p>
          <p className="juego-memoria-stat">Parejas encontradas: {parejasEncontradas.length}/6</p>
        </div>

        {juegoTerminado && (
          <div className="juego-memoria-victoria">
            ¡Felicidades! Completaste el juego en {intentos} intentos
          </div>
        )}

        <div className="juego-memoria-grid">
          {cartas.map((carta, index) => (
            <div
              key={carta.cartaId}
              onClick={() => manejarClickCarta(index)}
              className={`juego-memoria-carta ${esCartaVolteada(index) ? 'volteada' : ''}`}
            >
              {esCartaVolteada(index) ? carta.emoji : '❓'}
            </div>
          ))}
        </div>

        <button onClick={iniciarJuego} className="juego-memoria-boton">
          Nuevo Juego
        </button>
      </div>
    </div>
  );
};

export default JuegoMemoria;