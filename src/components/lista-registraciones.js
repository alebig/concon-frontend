import React from "react";
import sqlDateString from "./sql-dateString-manipulation";
import { TbEdit, TbTrash } from "react-icons/tb";
import '../styles/lista-registraciones.css'

function ListaRegistraciones ({ id, fecha, cantidad, horaLoc, baja, edicion })  {
    const fecha2 = sqlDateString(fecha, horaLoc);
    return (
        <div className="registro">
            <div className="detalle">
                {`${fecha2.diaSemCorto} ${fecha2.dd} ${ fecha2.mesStrCorto } ${ fecha2.yy }`}
            </div>
            <div className="detalle">
                {`${ fecha2.hh }:${ fecha2.min }`}
            </div>
            <div className="detalle">
                { cantidad }
            </div>
            <div className="iconos">
                <TbEdit className="icono-registro"
                        onClick={() => edicion(id)} />
                <TbTrash className="icono-registro" 
                        onClick={() => baja(id)} />
            </div>
        </div>
)
};

export default ListaRegistraciones;
