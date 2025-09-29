async function getReservation() { //Función para Get
    
    try {
        
        const response = await fetch('http://localhost:3001/citas', {
            method: 'GET',
            headers :{
                'Content-Type': 'application/json'
            }
        })

        const cita = await response.json()

        return cita    
        
    } catch (error) {

        console.error("Existe un error al obtener las citas", error)
        throw error
        
    }
}


async function postReservation(citas) { //Función para Post
    
    try {
        
        const response = await fetch('http://localhost:3001/citas', {
            method: 'POST',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(citas)
                    
        })

        const cita = await response.json()

        return cita    
        
    } catch (error) {

        console.error("Existe un error al crear las citas", error)
        throw error
        
    }
}


async function deleteReservation(id) { //Función para Delete
    
    try {
        
        const response = await fetch('http://localhost:3001/citas/'+id, {
            method: 'DELETE',
            headers :{
                'Content-Type': 'application/json'
            },
            
        })

        const cita = await response.json()

        return cita    
        
    } catch (error) {

        console.error("Existe un error al eliminar las citas", error)
        throw error
        
    }
}


async function putReservation(citas,id) { //Función para put
    
    try {
        
        const response = await fetch('http://localhost:3001/citas/'+id, {
            method: 'PUT',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(citas)
                    
        })

        const cita = await response.json()

        return cita    
        
    } catch (error) {

        console.error("Existe un error al editar las citas", error)
        throw error
        
    }
}

async function patchReservation(citas,id) { //Función para patch
    
    try {
        
        const response = await fetch('http://localhost:3001/citas/'+id, {
            method: 'PATCH',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(citas)
                    
        })

        const cita = await response.json()

        return cita    
        
    } catch (error) {

        console.error("Existe un error al editar las citas", error)
        throw error
        
    }
}

export{ getReservation,postReservation,deleteReservation,putReservation,patchReservation }