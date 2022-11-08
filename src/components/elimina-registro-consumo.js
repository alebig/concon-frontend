const elimina = async (id) => {
    const res = await fetch('http://localhost:4038/api/cafe/'+id,
        {method: 'DELETE'
        });
    if (res.ok) {
        const result = await res.json(); 
        return result;
    } else {
        alert(`Error API ${res.status} (${res.statusText})`)
    }
}

export default elimina