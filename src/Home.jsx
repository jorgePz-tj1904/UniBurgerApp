import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { Card } from "./componentes/Cards/Card";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import LoginModal from "./componentes/LoginModal/LoginModal";
import {
  BsPersonFillCheck,
  BsPersonFill,
  BsFillCartFill,
} from "react-icons/bs";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [perfil, setPerfil] = useState(false);
  const [loged, setLoged] = useState(false);
  const [catalogo, setCatalogo] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getApiData = async () => {
      try {
        const catalogo = await axios("http://localhost:3000/hamburguesas");

        setCatalogo(catalogo.data);
        const carritoUser = JSON.parse(localStorage.getItem("carrito"));
        setCarrito(carritoUser || []);
      } catch (error) {
        console.log(error);
      }
    };

    const userLoged = async () => {
      const login = await localStorage.getItem("login");
      const user = await localStorage.getItem("usuario");

      if (login == true || login == "true") {
        setLoged(true);
        setUsuario(user);
      }
    };
    getApiData();
    userLoged();
  }, []);

  const agregarAlCarrito = (burger) => {
    if (carrito.length < 6) {

      return setCarrito((prevCarrito) => {
        const nuevoCarrito = [...prevCarrito, burger];
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
        return nuevoCarrito;
      });
    }
    alert('we calmate')
  };

  return (
    <div>
      {showModal && (
        <div>
          <div
            onClick={() => setShowModal(false)}
            className={styles.modalConteiner}
          ></div>
          <LoginModal />
        </div>
      )}
      <div className={styles.navBar}>
        <div className={styles.userActions}>
          <BsFillCartFill
            className={styles.actions}
            id={styles.carrito}
            onClick={() => {
              navigate('/carrito')
            }}
          />
          {carrito.length > 0 && (
            <p className={styles.punto}>{carrito.length}</p>
          )}
          {loged ? (
            <div>
              <BsPersonFillCheck
                onClick={() => {
                  perfil ? setPerfil(false) : setPerfil(true);
                }}
                className={styles.actions}
                id={styles.login}
              />
              {perfil && (
                <div className={styles.perfilMenu}>
                  <h5>{usuario}</h5>
                  <button>
                    <NavLink
                      id={styles.editPerfil}
                      to={`/editarPerfil/${usuario}`}
                    >
                      Editar perfil
                    </NavLink>
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("login");
                      localStorage.removeItem("usuario");
                      window.location.reload();
                    }}
                  >
                    Cerrar sesion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <BsPersonFill
              onClick={() => setShowModal(true)}
              className={styles.actions}
              id={styles.login}
            />
          )}
        </div>
        <img
          id={styles.icon}
          src="../public/icono.png"
          alt="UniBurger"
          width={200}
        />
        <div className={styles.navConteiner}>
          <ul>
            <li>
              <a href="#catalogo">Catalogo</a>
            </li>
            <li>
              <a href="#Ubicación">Ubicación</a>
            </li>
            <li>
              <a href="#información">Información</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>
        </div>
      </div>

      {catalogo.length == 0 ? (
        <div className={styles.conteiner_iconoCargando}>
          <div id={styles.iconoCargando}></div>
        </div>
      ) : (
        <div className={styles.catalogo}>
          {catalogo.map((e, index) => {
            return (
              <Card
                key={index}
                burger={e}
                agregarAlCarrito={agregarAlCarrito}
              />
            );
          })}
        </div>
      )}

      <div id="Ubicación" className={styles.ubicación}>
        <div className={styles.tituloUbicación}>
          <h2>¿Donde encontrarlos?</h2>
        </div>

        <div className={styles.map}>
          <p>
            Esta es la ubicación en la que tendras que retirar tu hamburguesa
          </p>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1790.206963725862!2d-59.3656061434901!3d-26.183209994248447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDEwJzU5LjYiUyA1OcKwMjEnNTUuOSJX!5e0!3m2!1ses-419!2sar!4v1718114563906!5m2!1ses-419!2sar"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div id="información" className={styles.información}>
        <h2>Información</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          dolore, cumque minima, obcaecati ab sed sint maiores nobis, et quasi
          ducimus! Praesentium deserunt vero similique? Ea laborum veritatis
          minus est? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Laudantium alias voluptatem, mollitia consectetur praesentium vero
          magnam exercitationem quisquam ullam rem voluptates explicabo iste
          veritatis commodi ut nostrum asperiores consequuntur suscipit?Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Ratione veritatis
          quae alias! Aspernatur, similique repudiandae laborum reiciendis
          dolorum, libero voluptatibus sed nesciunt nisi nulla cupiditate
          incidunt esse ea quis quo?
        </p>
      </div>

      <div id="contacto" className={styles.contacto}>
        <h2>Si quieres contactarme!</h2>
        <p>aca va mi numero de wasap o algo asi, ya veré que hago</p>
      </div>
    </div>
  );
}

export default Home;
