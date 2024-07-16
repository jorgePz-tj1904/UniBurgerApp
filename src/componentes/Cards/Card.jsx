import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./card.module.css";
import { BsFillCartPlusFill } from "react-icons/bs";

export const Card = ({ burger, agregarAlCarrito}) => {

  return (
    <div className={styles.conteiner}>
      <img src={burger.imagenURL} alt="" className={styles.img} />
      <h1>{burger.nombre}</h1>
      <p>{burger.precio} $</p>
      <NavLink className={styles.masInfo} to={`detalles/${burger.id}`}>
        Mas información
      </NavLink>

      <div className={styles.buyConteiner}>
        <BsFillCartPlusFill id={styles.carrito} onClick={()=>agregarAlCarrito(burger)}/>
        <button>Comprar</button>
      </div>
    </div>
  );
};
