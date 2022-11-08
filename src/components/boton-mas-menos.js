import React from "react";
import '../styles/boton-mas-menos.css';

function BotonMasMenos ({ texto, handleClick }) {
  return (
    <button 
    className="botonMasMenos"
    onClick={handleClick}>
      {texto}
  </button>
  )
}

export default BotonMasMenos;