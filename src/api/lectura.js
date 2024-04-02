const lectura = async () => {
    const res = await fetch('api.alebig.com.ar/api/cafe',
    {method: 'GET'});
    if (res.ok) {
        const registros = await res.json()
        return registros
    } else {
        alert(`Error API ${res.status} (${res.statusText})`)
    }
}

export default lectura()