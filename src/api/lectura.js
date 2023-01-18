const lectura = async () => {
    const res = await fetch('http://127.0.0.1:4038/api/cafe',
    {method: 'GET',
     mode: 'cors'});
    if (res.ok) {
        const registros = await res.json()
        return registros
    } else {
        alert(`Error API ${res.status} (${res.statusText})`)
    }
}

export default lectura()