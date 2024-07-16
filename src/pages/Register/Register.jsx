import React, { useState, useRef } from "react";
import style from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { validarForm } from "./validarForm";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [pass, setPass] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const usuarioRef = useRef(null);
  const nombreRef = useRef(null);
  const numeroRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);

  const handleVerificador = async (name, value) => {
    let nuevosErrores = { ...errors };

    if (name === "password") {
      const error = await validarForm(name, value);
      if (error === "") {
        setPass(value);
      }
      nuevosErrores[name] = error;
    } else if (name === "password2") {
      const error = await validarForm(name, value, pass);
      nuevosErrores[name] = error;
    } else {
      const error = await validarForm(name, value);
      nuevosErrores[name] = error;
    }

    setErrors(nuevosErrores);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    const usuarioValue = usuarioRef.current ? usuarioRef.current.value : "";
    const nombreValue = nombreRef.current ? nombreRef.current.value : "";
    const numeroValue = numeroRef.current ? numeroRef.current.value : "";
    const passwordValue = passwordRef.current ? passwordRef.current.value : "";
    const password2Value = password2Ref.current
      ? password2Ref.current.value
      : "";

    await handleVerificador("usuario", usuarioValue);
    await handleVerificador("nombre", nombreValue);
    await handleVerificador("numero", numeroValue);
    await handleVerificador("password", passwordValue);
    await handleVerificador("password2", password2Value);

    const formErrors = Object.values(errors).filter((error) => error !== "");

    if (formErrors.length === 0) {
      try {
        await axios.post("http://localhost:3000/postUsuario", {
          user: usuarioValue,
          nombre: nombreValue,
          numeroCell: numeroValue,
          contraseña: passwordValue,
        });
        localStorage.setItem("login", true);
        localStorage.setItem("usuario",usuarioValue);
        navigate("/");
      } catch (error) {
        console.log(error);
        setCargando(false);
      } finally {
        setCargando(false);
      }
    } else {
      console.log("Errores en el formulario:", errors);
      setCargando(false);
    }
  };

  return (
    <div className={style.login}>
      <img src="../../../public/icono.png" alt="UniBurger" width={100} />
      {!cargando ? (
        <form className={style.form} onSubmit={handleSubmit}>
          <input
            ref={usuarioRef}
            onBlur={(e) => handleVerificador(e.target.name, e.target.value)}
            className={errors.usuario ? style.error : ""}
            name="usuario"
            type="text"
            placeholder="Ingrese su Usuario único"
          />
          {errors.usuario && (
            <p className={style.errorMessage}>{errors.usuario}</p>
          )}

          <input
            ref={nombreRef}
            onBlur={(e) => handleVerificador(e.target.name, e.target.value)}
            className={errors.nombre ? style.error : ""}
            name="nombre"
            type="text"
            placeholder="Ingrese su Nombre completo"
          />
          {errors.nombre && (
            <p className={style.errorMessage}>{errors.nombre}</p>
          )}

          <input
            ref={numeroRef}
            onBlur={(e) => handleVerificador(e.target.name, e.target.value)}
            className={errors.numero ? style.error : ""}
            name="numero"
            type="number"
            placeholder="Ingrese su numero de cell.(sin +54)"
          />
          {errors.numero && (
            <p className={style.errorMessage}>{errors.numero}</p>
          )}

          <input
            ref={passwordRef}
            className={errors.password ? style.error : ""}
            onBlur={(e) => handleVerificador(e.target.name, e.target.value)}
            name="password"
            type="password"
            placeholder="Ingrese su Contraseña"
          />
          {errors.password && (
            <p className={style.errorMessage}>{errors.password}</p>
          )}

          <input
            ref={password2Ref}
            className={errors.password2 ? style.error : ""}
            onBlur={(e) => handleVerificador(e.target.name, e.target.value)}
            name="password2"
            type="password"
            placeholder="Repita la contraseña"
          />
          {errors.password2 && (
            <p className={style.errorMessage}>{errors.password2}</p>
          )}
          <button id={style.submit} type="submit">
            Registrarse
          </button>
        </form>
      ) : (
        <div className={style.conteiner_iconoCargando}>
          <div id={style.iconoCargando}></div>
        </div>
      )}
    </div>
  );
};

export default Register;
