import React, { useState, useEffect } from 'react';
import BotonMasMenos from './boton-mas-menos';
import BotonIngresar from './boton-ingresar';
import '../styles/contenedor-i-c.css';
import lectura from "../api/lectura";
import agrega from "../api/graba-nuevo-consumo";
import elimina from './elimina-registro-consumo';
import grabaMod from '../api/graba-modificacion';
import ListaRegistraciones from './lista-registraciones';
import sqlAHoraLocal from './sqlAHoraLocal';
import aISOString from './aISOString';
import FormEdicion from './form-edicion';

function IngresaConsumo() {

  const [pocillosASumar, setPocillosASumar] = useState(1);

  const [registros, setRegistros] = useState([]);

  const [editRecord, setEditRecord] = useState({});

  const [formEdit, setFormEdit] = useState(false);

  const lee = async () => {
      const record = await lectura
      let orderedRecords = await record.sort(function(x, y){
        let a = new Date(x.fecha_registro),
            b = new Date(y.fecha_registro);
        return b - a;
      });
      orderedRecords.map( record => record.fecha_registro = sqlAHoraLocal(record.fecha_registro))
      setRegistros( await orderedRecords );
  }

  useEffect(() => {
    lee()
  }, []);

  const sumar = () => {
    setPocillosASumar(pocillosASumar + 1)
  };
  
  const restar = () => {
    if (pocillosASumar > 1) {
      setPocillosASumar(pocillosASumar - 1)
    }
  };
  
  const agregar = async () => {

    const fechaActual = new Date();
    const fechaLocal = aISOString(fechaActual).slice(0, 19).replace('T', ' ');
    const fechUTC = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
    const newRecord = {
        producto: 1,
        uni_med: 1,
        fecha_registro: fechUTC,
        cantidad: pocillosASumar
      }
    const graba = await agrega(newRecord);
    console.log(`Ingresado registro ${graba}`);
    newRecord.record_id = await graba;
    newRecord.fecha_registro = fechaLocal;
    const updatedRecords = [newRecord, ...registros];
    setPocillosASumar(1);
    setRegistros(updatedRecords);
  };

  const eliminar = async (id) => {
    const msg = await elimina (id);
    console.log(msg)
    const updatedRecords = registros.filter(registro => registro.record_id !== id);
    setRegistros(updatedRecords);
  }

  const paraEditar = (id) => {
    const registroAEditar = {};
    const indx = registros.findIndex((registro) => {return registro.record_id === id});
    registroAEditar.record_id = id;
    registroAEditar.producto = registros[indx].producto;
    registroAEditar.uni_med = registros[indx].uni_med;
    registroAEditar.fecha_registro = registros[indx].fecha_registro;
    registroAEditar.cantidad = registros[indx].cantidad;
    setEditRecord(registroAEditar);
    setFormEdit(true);
  }

  const modificar = async (registroActualizado) => {

    // --------------------------------------------------------------------------------------------
    //        Actualiza array en memoria y vuelve a ordenar, para el renderizado

    let reg2 = registros.filter((registro) => registro.record_id !== registroActualizado.record_id)
    reg2.push(registroActualizado)
    
    const orderedRecords = reg2.sort(function(x, y){
      let a = new Date(x.fecha_registro),
      b = new Date(y.fecha_registro);
      return b - a;
    });

    
    // --------------------------------------------------------------------------------------------
    //        Convierte fecha a UTC y actualiza BD
    
    const fec = registroActualizado.fecha_registro
    const fechaUTC = new Date (registroActualizado.fecha_registro).toISOString().slice(0, 19).replace('T', ' ');
    registroActualizado.fecha_registro = fechaUTC;
    
    const result = await grabaMod(registroActualizado.record_id, registroActualizado);
    console.log(result)
    registroActualizado.fecha_registro = fec;
    
    setRegistros(orderedRecords)
    setFormEdit(false);
  }

  return (
    <>
    <div className='contenedorIC'>
      <div className='pocillos'>
        <p>
          {pocillosASumar}
        </p>
      </div>
      <div className='operaciones'>
        <BotonMasMenos
          texto = '+'
          handleClick = {sumar} />
        <BotonMasMenos
          texto = '-'
          handleClick = {restar} />
      </div>
      <div className = 'ingreso'>
        <BotonIngresar
          handleClick={agregar} />
      </div>
    </div>
    <div className={formEdit ? 'edicion' : 'oculto'}>
      {formEdit && <FormEdicion 
            registro = {editRecord}
            modificar = {modificar} />}
    </div>
    <div className='registraciones'>
      <div className='registraciones-todas'>
        {
          registros.map((registro) =>
            <ListaRegistraciones 
              key={registro.record_id}
              id={registro.record_id}
              fecha={registro.fecha_registro}
              cantidad={registro.cantidad}
              horaLoc={true}
              baja={eliminar}
              edicion={paraEditar} />)
        }
      </div>
    </div>
</>
  )
};

export default IngresaConsumo;