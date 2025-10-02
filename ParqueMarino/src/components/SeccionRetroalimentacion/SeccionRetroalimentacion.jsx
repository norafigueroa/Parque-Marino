import React from 'react'
import './SeccionRetroalimentacion.css'

function SeccionRetroalimentacion() {
  return (
    <div>
        <div>
            <div className='informacion'>
                <h1>Contáctanos</h1>

                <p className='contacto'>📌Paseo de los Turistas, Puntarenas, Costa Rica.</p>
                <p className='contacto'>200 metros al oeste de la terminal de buses de San José y a 300 metros del muelle y la antigua Capitanía de Puerto.</p>        
                <p className='contacto'>📞 506 2661 5272 </p>
                <p className='contacto'>+506 8864 6556</p>
                <p className='contacto'>📧info@parquemarino.org</p>
                <p className='contacto'>💻 www.parquemarino.org</p>

                <div className="mapa">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.123456789!2d-84.8272!3d9.9765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0c1a0b2c0f0ff%3A0x1234567890abcdef!2sParque%20Marino%20del%20Pac%C3%ADfico!5e0!3m2!1ses!2scr!4v1695360000000!5m2!1ses!2scr" 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>

        </div>
    </div>
  )
}

export default SeccionRetroalimentacion