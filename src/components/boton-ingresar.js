import React from 'react';

function BotonIngresar ({ handleClick }) {
  return (
    <button
    className='BotonIngresar'
    onClick={handleClick}>
      Ingresar consumo
  </button>
  )
}

export default BotonIngresar