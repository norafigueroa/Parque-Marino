import React from 'react'

function SeccionRetroalimentacion() {
  return (
    <div>
        <div>
            <div className='informacion'>
                <h2>Información</h2>
                <div className="map-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.123456789!2d-84.8272!3d9.9765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0c1a0b2c0f0ff%3A0x1234567890abcdef!2sParque%20Marino%20del%20Pac%C3%ADfico!5e0!3m2!1ses!2scr!4v1695360000000!5m2!1ses!2scr" 
                        width="600" 
                        height="450" 
                        style={{border:0}} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                
                <p>📌Paseo de los Turistas, Puntarenas, Costa Rica.</p>
                <p>200 metros al oeste de la terminal de buses de San José y a 300 metros del muelle y la antigua Capitanía de Puerto.</p>        
                <p>📞 506 2661 5272 </p>
                <p>+506 8864 6556</p>
                <p>📧info@parquemarino.org</p>
                <p>💻 www.parquemarino.org</p>
            </div>
            

            <h1>Contáctanos</h1>

            <div className='sugerencias'>
                <h2>Sugerencias, dudas o comentarios</h2>
                <div className='sugerencias'>
                    <textarea placeholder="Escribe tu sugerencia o comentario..." rows="4" cols="50"></textarea>
                </div>
                <div className='puntuacion'>
                    <p>Puntuación:</p>
                    <span>⭐ ⭐ ⭐ ⭐ ⭐</span>
                </div>
            </div>

            <button>Enviar</button>

        </div>
    </div>
  )
}

export default SeccionRetroalimentacion