async function getCard() { //Función para Get
    
    try {
        
        const response = await fetch('http://localhost:3001/tarjetas', {
            method: 'GET',
            headers :{
                'Content-Type': 'application/json'
            }
        })

        const tarjeta = await response.json()

        return tarjeta    
        
    } catch (error) {

        console.error("Existe un error al obtener las tarjetas", error)
        throw error
        
    }
}

export{ getCard }