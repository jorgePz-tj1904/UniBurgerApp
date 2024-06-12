import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { Card } from './componentes/Card'
import axios from 'axios';

function Home() {

  const [catalogo, setCatalogo] = useState([]);

  // const catalogo = [{ nombre: "hamburguesa completa", precio: "2200" }, { nombre: "hamburguesa doble", precio: "3200" }, {nombre: "chesseBurger", precio: "2500"}]

  useEffect(async()=>{
    try {
      const catalogo = await axios('http://localhost:3000/hamburguesas');
      setCatalogo(catalogo)
    } catch (error) {
      console.log(error.message);
    }
  }, catalogo)
  return (
    <div>
      <h1>UniBurgerAPP</h1>

      <div className={styles.navBar}>
      <ul>
          <li><a href="#catalogo">Catalogo</a></li>
          <li><a href="#Ubicación">Ubicación</a></li>
          <li><a href="#información">Información</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>
      
      
      
      <div className={styles.catalogo}>
        {
          catalogo.map((e, index) => {
            return (
              <Card key={index} burger={e} />
            );
          })
        }
      </div>

      <div id='Ubicación' className={styles.ubicación}>
        <h2>Ubicación</h2>
        <p>Esta es la ubicación en la que tendras que retirar tu hamburguesa</p>

        <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1790.206963725862!2d-59.3668061434901!3d-26.183209994248447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDEwJzU5LjYiUyA1OcKwMjEnNTUuOSJX!5e0!3m2!1ses-419!2sar!4v1718114563906!5m2!1ses-419!2sar" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      
      <div id='información' className={styles.información}>
        <h2>Información</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur dolore, cumque minima, obcaecati ab sed sint maiores nobis, et quasi ducimus! Praesentium deserunt vero similique? Ea laborum veritatis minus est? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium alias voluptatem, mollitia consectetur praesentium vero magnam exercitationem quisquam ullam rem voluptates explicabo iste veritatis commodi ut nostrum asperiores consequuntur suscipit?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione veritatis quae alias! Aspernatur, similique repudiandae laborum reiciendis dolorum, libero voluptatibus sed nesciunt nisi nulla cupiditate incidunt esse ea quis quo?</p>
      </div>

      <div id='contacto' className={styles.contacto}>
        <h2>Si quieres contactarme!</h2>
        <p>aca va mi numero de wasap o algo asi, ya veré que hago</p>
      </div>

    </div>
  )
}

export default Home