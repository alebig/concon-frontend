const elimina = async (id) => {
    const res = await fetch('https://api.alebig.com.ar/api/cafe/'+id,
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