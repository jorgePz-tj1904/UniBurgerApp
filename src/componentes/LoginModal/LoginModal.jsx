import React , {useState} from 'react'
import style from './LoginModal.module.css'
import { NavLink } from "react-router-dom";
import axios from "axios"

const LoginModal = () => {
  
  const [error, setError] = useState("");
  const [credenciales, setcredenciales]=useState({});
  

  const login=async(e)=>{
    e.preventDefault();
    console.log(credenciales);
    try {
      const response = await axios.post("http://localhost:3000/login", credenciales);
      localStorage.setItem('login', true);
      localStorage.setItem('usuario', credenciales.usuario);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error.response.data)
    }
  }

  const guardarCredenciales=(name, value)=>{
    setError("");
    switch (name) {
      case "usuario":
        setcredenciales((prev) => ({ ...prev, [name]: value }));
        break;

      case "contraseña":
        setcredenciales((prev) => ({ ...prev, [name]: value }));
        break;
    }
  }

  return (
    
        <div className={style.login}>
          <img
          src="../../../public/icono.png"
          alt="UniBurger"
          width={100}
        />
        <form onSubmit={login} className={style.form} action="">
          {
            error&& <p className={style.errorMessage}>{error}</p>
          }
          <input className={error !== "" ? style.error:null} onBlur={(e)=>guardarCredenciales(e.target.name,e.target.value)} name='usuario' type="text" placeholder='Ingrese su Usuario'/>
          <input className={error !== "" ? style.error:null} onBlur={(e)=>guardarCredenciales(e.target.name,e.target.value)}  name='contraseña' type="password" placeholder='Igrese su Contraseña'/>
          <button type='submit'>Iniciar sesión</button>
        </form>
        <h3>No tienes cuenta? <NavLink id={style.NavLink} to="register">Registrate!</NavLink></h3>
        </div>
  )
}

export default LoginModal