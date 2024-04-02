const grabaMod = async (id, editedRecord) => {
    const result = await fetch('api.alebig.com.ar/api/cafe'+id,
    {method: 'PUT',
    body: JSON.stringify(editedRecord), 
    headers: {'Content-Type': 'application/json'}
    });
    if (result.ok) {
        const mensaje = await result.json()
        return mensaje
    } else {
        console.log(`Error - No se actualizó el registro ${id}`)
        console.log(`Error API ${result.status} (${result.statusText})`)
    }
}

export default grabaMod