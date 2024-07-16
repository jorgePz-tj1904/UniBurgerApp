import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useParams} from 'react-router-dom';
import axios from 'axios'


const Info = () => {
  const {id}=useParams();
  const [burger, setBurger] = useState(null);

  useEffect(()=>{
    const getInfo = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/getBurger/${id}`);
        // console.log(result.data);
        if (result.data) {
          setBurger(result.data);
        } else {
          console.log('No se encontraron datos');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, [id]);
  
  return (
    <div>
      <h1>Hamburguesa Nro {id}</h1>
      <NavLink to='/'>Volver</NavLink>
      <p>Aquí puedes encontrar más información sobre nuestras hamburguesas.</p>
      {burger ? (
        <div>
          <h3>{burger.nombre}</h3>
          <p>Precio: {burger.precio}</p>
          <p>Detalles: {burger.detalles}</p>
          <img width={300} src={burger.imagenURL} alt="" />
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};


export default Info;
