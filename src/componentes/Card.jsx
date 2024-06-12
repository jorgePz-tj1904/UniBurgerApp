import React from 'react';
import { NavLink } from 'react-router-dom';

export const Card = ({ burger }) => {
  return (
    <div>
      <h1>{burger.nombre}</h1>
      <p>{burger.precio}</p>
      <NavLink to={`detalles/${burger.id}`}>Mas información</NavLink>

      <button>Comprar</button>
      
    </div>
  );
};
