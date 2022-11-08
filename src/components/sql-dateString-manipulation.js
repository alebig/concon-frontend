//import aISOString from "./aISOString";

function sqlDateString (sqlDateString, horaLoc) {

    // Si el param horaLoc es true la fecha-hora UTC se convierte a local
    
    // la función toISOString() convierte la fecha-hora a UTC y así es como
    // se graba en la BD. Después, cuando el backend lee la BD, automáticamente
    // vuelve a hacer la conversión en igual sentido, como si la fecha-hora UTC
    // leída fuese local y la convirtiera a UTC. Por ese motivo a la fecha-hora
    // que entrega el backend y que acá se recibe por param se le resta el doble 
    // del offset para regresarla a la fecha-hora local.

//    const hoy = new Date();
//    const tzOffset = hoy.getTimezoneOffset();
//    const aHoraLocal = tzOffset*60000*2;  

    let ymdhms = sqlDateString.split(/[- : T Z .]/);
//    const aTzLocal1 = new Date(ymdhms[0], ymdhms[1]-1, ymdhms[2], ymdhms[3], 
//                    ymdhms[4], ymdhms[5]);
//    const aTzLocal2 = new Date(aTzLocal1 - aHoraLocal);
//    const ymdhmsLoc = aISOString(aTzLocal2).split(/[- : T Z .]/);

//    if (horaLoc) ymdhms = ymdhmsLoc ;

    const meses = [ ["enero", "ene", 31], 
                    ["febrero", "feb", 28], 
                    ["marzo", "mar", 31], 
                    ["abril", "abr", 30], 
                    ["mayo", "may", 31], 
                    ["junio", "jun", 30], 
                    ["julio", "jul", 31], 
                    ["agosto", "ago", 31], 
                    ["septiembre", "sep", 30], 
                    ["octubre", "oct", 31], 
                    ["noviembre", "nov", 30], 
                    ["diciembre", "dic", 31]];

    const dias = [  ["Sábado", "Sá"],
                    ["Domingo", "Do"],
                    ["Lunes", "Lu"],
                    ["Martes", "Ma"],
                    ["Miercoles", "Mi"],
                    ["Jueves", "Ju"],
                    ["Viernes", "Vi"]];

    let sumaDias = (dia, mes, anio) => {
        let suma = 0;
        suma = (anio - 1) * 365 + parseInt((parseInt(anio) - 1) / 4);
        for (let x = 0; (mes - 1) > x; x++ ) {
            suma += meses[x][2];
        }
        if (mes > 2 && anio % 4 === 0) {
            suma++;
        }
        suma += dia;
        return suma;
    }

    const resultado = {
        yyyy: ymdhms[0],
        yy: ymdhms[0].slice(-2),
        mm: ymdhms[1],
        mesStrCorto: meses[parseInt(ymdhms[1])-1][1],
        mesStrLargo: meses[parseInt(ymdhms[1])-1][0],
        dd: ymdhms[2],
        diaSemCorto: "",
        diaSemLargo: "",
        hh: ymdhms[3],
        min: ymdhms[4],
        ss: ymdhms[5]
    };

    const desdeCero = sumaDias(parseInt(resultado.dd), parseInt(resultado.mm), parseInt(resultado.yyyy))
    const diaSem = desdeCero % 7
    resultado.diaSemCorto = dias[diaSem][1];
    resultado.diaSemLargo = dias[diaSem][0];
    return resultado;
}

export default sqlDateString;