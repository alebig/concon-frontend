const agrega = async (newRecord) => {
    const res = await fetch('http://localhost:4038/api/cafe',
        {method: 'POST',
        body: JSON.stringify(newRecord),
        headers: {'Content-Type': 'application/json'}
        });
    if (res.ok) {
        const nuevoId = await res.json(); 
        return nuevoId;
    } else {
        alert(`Error API ${res.status} (${res.message})`)
    }
}

export default agrega