import React, { useState, useEffect } from "react";
import style from "./EditProfile.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { validarForm } from "../Register/validarForm";

const Edit = () => {
  const { usuario } = useParams();
  const [errors, setErrors] = useState({});
  const [perfil, setPerfil] = useState(null);
  const [editar, setEditar] = useState({
    user: false,
    nombre: false,
    numeroCell: false,
    contraseña: false,
  });
  const [pass, setPass] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getUsuario`, {
          params: { usuario: usuario },
        });
        setPerfil(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [usuario]);

  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerificador = async (name, value) => {
    let nuevosErrores = { ...errors };

    if (name === "contraseña") {
      const error = await validarForm(name, value);
      console.log(error);
      if (error === "") {
        setPass(value);
        console.log("se cambió");
      }
      nuevosErrores[name] = error;
    } else if (name === "password2") {
      const error = await validarForm(name, value, pass);
      console.log(pass);
      nuevosErrores[name] = error;
    } else {
      console.log(name);
      const error = await validarForm(name, value);
      console.log(error);
      nuevosErrores[name] = error;
    }
    console.log(nuevosErrores);
    setErrors(nuevosErrores);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioValue = perfil.user ? perfil.user : "";
    const nombreValue = perfil.nombre ? perfil.nombre : "";
    const numeroValue = perfil.numeroCell ? perfil.numeroCell : "";
    const passwordValue = perfil.contraseña ? perfil.contraseña : "";
    const password2Value = perfil.contraseña ? perfil.contraseña : "";

    await handleVerificador("usuario", usuarioValue);
    await handleVerificador("nombre", nombreValue);
    await handleVerificador("numero", numeroValue);
    await handleVerificador("password", passwordValue);
    await handleVerificador("password2", password2Value);

    const formErrors = Object.values(errors).filter((error) => error !== "");

    if (formErrors.length === 0) {
      try {
        await axios.post("http://localhost:3000/editUsuario", perfil);
        localStorage.setItem("login", true);
        localStorage.setItem("usuario", usuarioValue);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Errores en el formulario:", errors);
    }
  };

  return (
    <div className={style.conteiner}>
      <img src="../../../public/icono.png" alt="UniBurger" width={100} />
      {perfil ? (
        <form onSubmit={handleSubmit}>
          {editar.user ? (
            <div>
              <input
                type="text"
                name="user"
                value={perfil.user}
                onChange={handleChange}
                onBlur={(e) => handleVerificador(e.target.name, e.target.value)}
                className={errors.usuario ? style.error : ""}
              />
              {errors.user && (
                <p className={style.errorMessage}>{errors.user}</p>
              )}
            </div>
          ) : (
            <h5>
              {perfil.user}
              <FaEdit
                onClick={() => setEditar((prev) => ({ ...prev, user: true }))}
                className={style.editIcono}
              />
            </h5>
          )}

          {editar.nombre ? (
            <div>
              <input
                type="text"
                name="nombre"
                value={perfil.nombre}
                onChange={handleChange}
                onBlur={(e) => handleVerificador(e.target.name, e.target.value)}
                className={errors.nombre ? style.error : ""}
              />
              {errors.nombre && (
                <p className={style.errorMessage}>{errors.nombre}</p>
              )}
            </div>
          ) : (
            <h5>
              {perfil.nombre}
              <FaEdit
                onClick={() => setEditar((prev) => ({ ...prev, nombre: true }))}
                className={style.editIcono}
              />
            </h5>
          )}

          {editar.numeroCell ? (
            <div>
              <input
                type="number"
                name="numeroCell"
                value={perfil.numeroCell}
                onChange={handleChange}
                onBlur={(e) => handleVerificador(e.target.name, e.target.value)}
                className={errors.numeroCell ? style.error : ""}
              />
              {errors.numeroCell && (
                <p className={style.errorMessage}>{errors.numeroCell}</p>
              )}
            </div>
          ) : (
            <h5>
              {perfil.numeroCell}
              <FaEdit
                onClick={() =>
                  setEditar((prev) => ({ ...prev, numeroCell: true }))
                }
                className={style.editIcono}
              />
            </h5>
          )}

          {editar.contraseña ? (
            <div>
              <input
                type="password"
                name="contraseña"
                value={perfil.contraseña}
                onChange={handleChange}
                onBlur={(e) => handleVerificador(e.target.name, e.target.value)}
                className={errors.password ? style.error : ""}
              />
              {errors.contraseña && (
                <p className={style.errorMessage}>{errors.contraseña}</p>
              )}
              <input
                type="password"
                name="password2"
                placeholder="Repita la contraseña"
                onBlur={(e) => handleVerificador(e.target.name, e.target.value)}
                className={errors.password2 ? style.error : ""}
              />
              {errors.password2 && (
                <p className={style.errorMessage}>{errors.password2}</p>
              )}
            </div>
          ) : (
            <h5>
              ******
              <FaEdit
                onClick={() =>{
                  setEditar((prev) => ({ ...prev, contraseña: true }));
                  setPass(perfil.contraseña);
                }
                }
                className={style.editIcono}
              />
            </h5>
          )}
          <button type="submit">Guardar</button>
        </form>
      ) : (
        <p>Cargando usuario...</p>
      )}
    </div>
  );
};

export default Edit;
