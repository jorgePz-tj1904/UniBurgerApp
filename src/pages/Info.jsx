import React from 'react';
import { NavLink, useParams} from 'react-router-dom';

const Info = () => {
  const {id}=useParams();
  return (
    <div>
      <h1>hamburguesa nro {id}</h1>
      <NavLink to='/'>Volver</NavLink>
      <p>Aquí puedes encontrar más información sobre nuestras hamburguesas.</p>
    </div>
  );
};


export default Info;
