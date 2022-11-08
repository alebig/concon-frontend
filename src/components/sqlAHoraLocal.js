import aISOString from "./aISOString";

const sqlAHoraLocal = (fechaISO) => {
    const ahora = new Date();
    const tzOffset = ahora.getTimezoneOffset();
    const offset = tzOffset*60000;  

    let ymdhms = fechaISO.split(/[- : T Z .]/);
    const aTzLocal1 = new Date(ymdhms[0], ymdhms[1]-1, ymdhms[2], ymdhms[3], 
                    ymdhms[4], ymdhms[5]);
    const aTzLocal2 = new Date(aTzLocal1 - offset);
    const horaLocal = aISOString(aTzLocal2)/* .split(/[- : T Z .]/) */;
    return horaLocal;
}

export default sqlAHoraLocal;