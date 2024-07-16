import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Carrito.module.css";
import { MdDelete } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { NavLink, useNavigate } from "react-router-dom";
const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [preferenceId, setPreferenceId] = useState(null);
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  initMercadoPago("APP_USR-9e3374da-3d6f-4449-a26b-3c20d96bfe90", {
    locale: 'es-AR'
  });

  useEffect(() => {
    const carritoUser = JSON.parse(localStorage.getItem("carrito"));
    console.log(carritoUser);
    setCarrito(carritoUser);

    
  const totalInicial = carritoUser?.reduce((acc, burger) => acc + burger.precio, 0) || 0;
  setTotal(totalInicial);
  }, []);

  const deleteBurger = (nombre) => {
    const updatedCarrito = [...carrito];

    const index = updatedCarrito.findIndex(
      (burger) => burger.nombre === nombre
    );

    if (index !== -1) {
      const [removedBurger] = updatedCarrito.splice(index, 1);
      setCarrito(updatedCarrito);

      const nuevoTotal = total - removedBurger.precio;
      setTotal(nuevoTotal);

      localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
    }
  };

  const createPreference = async () => {
    try {
      const response = await axios.post('http://localhost:3000/create_preference', {
        title: "Hamburguesas",
        quantity: 1,
        price: total
      });
      console.log(response.data.id);
      return response.data.id;
    } catch (error) {
      console.log(error);
    }
  }

  const handleBuy = async () => {
    if (carrito.length == 0) {
      return setError('No hay nada en el carrito pa, como vas a comprar algo si el carrito esta vacio')
    }
    let mensaje = 'Hola, quiero hacer un pedido:\n ';
      carrito.forEach(item => {
          mensaje +=  `- ${item.nombre} - `;
      });
      mensaje += `Total: ${total}`;
      setCargando(true);

      const id = await createPreference(); 
      id && setPreferenceId(id);
      setCargando(false);
      return setMensaje(mensaje);
  }

  return (
    <div className={style.Conteiner}>
      <NavLink to={'/'} className={style.volverBtn}><IoIosArrowBack /></NavLink>
      <img src="../../../public/icono.png" alt="UniBurger" width={100} />
      <h2>Carrito</h2>
      <div className={style.listaConteiner}>
        <ul className={style.lista}>
          {carrito.map((burger, index) => (
            <div key={index} className={style.CardCarrito}>
              <h4>{burger.nombre}</h4>
              <h4>${burger.precio}</h4>
              <MdDelete
                onClick={() => deleteBurger(burger.nombre)}
                id={style.iconoDelete}
              />
            </div>
          ))}
        </ul>
        <p >{error}</p>
        <h2>Total: ${total}</h2>
        {
          !cargando ?<button className={ preferenceId? style.buttonOf: ""} onClick={handleBuy}>Comprar</button> :<div className={style.conteiner_iconoCargando}>
          <div id={style.iconoCargando}></div>
        </div>
        }
        <div id="wallet_container">
          {
            preferenceId && (<div><Wallet id="wallet_container"
              initialization={{ preferenceId: preferenceId, redirectMode:"blank" }}
              customization={{ texts: { valueProp: "smart_option" } }}/> <a className={style.wasapBtn} href={`https://api.whatsapp.com/send?phone=543704616059&text=${mensaje}`} target="blank">Continuar por Whatsapp <IoLogoWhatsapp /></a></div>)
          }
        </div>
      </div>
    </div>
  );
};

export default Carrito;