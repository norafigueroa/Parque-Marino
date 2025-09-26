async function getAnimal() { //Función para Get
    
    try {
        
        const response = await fetch('http://localhost:3001/animales', {
            method: 'GET',
            headers :{
                'Content-Type': 'application/json'
            }
        })

        const animals = await response.json()

        return animals    
        
    } catch (error) {

        console.error("Existe un error al obtener los animales", error)
        throw error
        
    }
}


async function postAnimal(animal) { //Función para Post
    
    try {
        
        const response = await fetch('http://localhost:3001/animales', {
            method: 'POST',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(animal)
                    
        })

        const animals = await response.json()

        return animals    
        
    } catch (error) {

        console.error("Existe un error al crear los animales", error)
        throw error
        
    }
}


async function deleteAnimal(id) { //Función para Delete
    
    try {
        
        const response = await fetch('http://localhost:3001/animales/'+id, {
            method: 'DELETE',
            headers :{
                'Content-Type': 'application/json'
            },
            
        })

        const animals = await response.json()

        return animals    
        
    } catch (error) {

        console.error("Existe un error al eliminar los animales", error)
        throw error
        
    }
}


async function putAnimal(animal,id) { //Función para put
    
    try {
        
        const response = await fetch('http://localhost:3001/animales/'+id, {
            method: 'PUT',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(animal)
                    
        })

        const animals = await response.json()

        return animals    
        
    } catch (error) {

        console.error("Existe un error al editar los animales", error)
        throw error
        
    }
}

async function patchAnimal(animal,id) { //Función para patch
    
    try {
        
        const response = await fetch('http://localhost:3001/animales/'+id, {
            method: 'PATCH',
            headers :{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(animal)
                    
        })

        const animals = await response.json()

        return animals    
        
    } catch (error) {

        console.error("Existe un error al editar los animales", error)
        throw error
        
    }
}

export{ getAnimal,postAnimal,deleteAnimal,putAnimal,patchAnimal }