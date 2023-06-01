const grabaMod = async (id, editedRecord) => {
    const res = await fetch('http://191.101.235.205:4038/api/cafe/'+id,
        {method: 'PUT',
         body: JSON.stringify(editedRecord), 
         headers: {'Content-Type': 'application/json'}
        });
    if (res.ok) {
    //    console.log(`Registro ${id} fue modificado`) 
        const mensaje = await res.json()
        return mensaje;
    } else {
        alert(`Error API ${res.status} (${res.statusText})`)
    }
}

export default grabaMod