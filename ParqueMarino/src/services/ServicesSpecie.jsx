async function getSpecie() { //Función para Get
    
    try {
        
        const response = await fetch('http://localhost:3001/especies', {
            method: 'GET',
            headers :{
                'Content-Type': 'application/json'
            }
        })

        const specie = await response.json()

        return specie    
        
    } catch (error) {

        console.error("Existe un error al obtener las especies", error)
        throw error
        
    }
}


async function postSpecie(especie) { //Función para Post
    
    try {
        
        const response = await fetch('http://localhost:3001/especies', {
            method: 'POST',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(especie)
                    
        })

        const specie = await response.json()

        return specie    
        
    } catch (error) {

        console.error("Existe un error al crear las especies", error)
        throw error
        
    }
}


async function deleteSpecie(id) { //Función para Delete
    
    try {
        
        const response = await fetch('http://localhost:3001/especies/'+id, {
            method: 'DELETE',
            headers :{
                'Content-Type': 'application/json'
            },
            
        })

        const specie = await response.json()

        return specie    
        
    } catch (error) {

        console.error("Existe un error al eliminar las especies", error)
        throw error
        
    }
}


async function putSpecie(especie,id) { //Función para put
    
    try {
        
        const response = await fetch('http://localhost:3001/especies/'+id, {
            method: 'PUT',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(especie)
                    
        })

        const specie = await response.json()

        return specie    
        
    } catch (error) {

        console.error("Existe un error al editar las especies", error)
        throw error
        
    }
}

async function patchSpecie(especie,id) { //Función para patch
    
    try {
        
        const response = await fetch('http://localhost:3001/especies/'+id, {
            method: 'PATCH',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(especie)
                    
        })

        const specie = await response.json()

        return specie    
        
    } catch (error) {

        console.error("Existe un error al editar las especies", error)
        throw error
        
    }
}

export{ getSpecie,postSpecie,deleteSpecie,putSpecie,patchSpecie }