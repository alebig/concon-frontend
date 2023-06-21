import {React, useRef, useEffect} from "react";
import '../styles/form-edicion.css';

function FormEdicion ( {registro, modificar }) {

    const cant = useRef(null);
    useEffect(() => {
//        const cant2 = cant.current.value
//        console.log(cant2)
    }, []);
    let ymdhms = registro.fecha_registro.split(/[- : T Z .]/);
    const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');

    let fecha = ymdhms[0] +
      '-' + pad(ymdhms[1]) +
      '-' + pad(ymdhms[2]);

    let hora = pad(ymdhms[3]) +
      ':' + pad(ymdhms[4]);
    
    const valorActualizado = registro;

    const handleChange = (e) => {
        if (e.target.name === "fecha_registro") {
            valorActualizado.fecha_registro = e.target.value + valorActualizado.fecha_registro.slice(10);
        } else 
        if (e.target.name === "hora_registro") {
            valorActualizado.fecha_registro = valorActualizado.fecha_registro.slice(0, 11) + 
                                              e.target.value + 
                                              valorActualizado.fecha_registro.slice(-3);
        } else 
            {valorActualizado[e.target.name] = e.target.value}
    }

    const handleEnviar = (e) => {
//        console.log(cant.current.value)
            modificar(valorActualizado)
    }

    return (
        <form className="form-edicion">
            <div className="fecha-hora">
                <input  className="edt-fecha"
                        type="date" 
                        name="fecha_registro" 
                        defaultValue={fecha || " "}
                        onChange={(e) => handleChange(e)} />
                <input  className="edt-fecha"
                        type="time" 
                        name="hora_registro" 
                        defaultValue={hora || " "}
                        onChange={(e) => handleChange(e)} />
            </div>
            <input  className="edt-cantidad"
                    ref={cant}
                    type="text"
                    name="cantidad"
                    defaultValue={valorActualizado.cantidad || " "}
                    onChange={(e) => handleChange(e)} />
            <button className="edt-boton"
                    type="submit"
                    onClick={handleEnviar}>
                        Guardar la modificación
                    </button>
        </form>
    )
};

export default FormEdicion;