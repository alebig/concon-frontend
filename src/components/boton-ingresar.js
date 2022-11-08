import React from 'react';

function BotonIngresar ({ handleClick }) {
  return (
    <button
    className='BotonIngresar'
    onClick={handleClick}>
      Cargar consumo
  </button>
  )
}

export default BotonIngresar