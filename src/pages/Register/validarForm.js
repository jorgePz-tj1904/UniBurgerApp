import axios from 'axios';
import { expresiones } from "./expresiones";

export const validarForm = async (name, value, pass) => {
  let error = "";
  if (value !== "") {
    switch (name) {
      case "usuario":
      case "user":
        if (!expresiones.usuario.test(value)) {
          error = "El usuario debe tener entre 4 y 16 caracteres y solo puede contener letras, números, guiones y guion bajo.";
        } else {
          try {
            const response = await axios.post("http://localhost:3000/validarUser", { validar: value });
            console.log(response);
          } catch (catchError) {
            error = catchError.response.data.message;
            console.log(catchError);
          }
        }
        break;

      case "nombre":
        if (!expresiones.nombre.test(value)) {
          error = "El nombre debe tener entre 3 y 40 caracteres y solo puede contener letras y espacios, incluyendo acentos.";
        }
        break;

      case "numero":
      case "numeroCell":
        if (!expresiones.telefono.test(value)) {
          error = "El teléfono debe tener 10 dígitos.";
        } else {
          try {
            const response = await axios.post("http://localhost:3000/validarUser", { validar: value });
            console.log(response);
          } catch (catchError) {
            error = catchError.response.data.message;
            console.log(catchError);
          }
        }
        break;

      case "password":
      case "contraseña":
        if (!expresiones.password.test(value)) {
          error = "La contraseña debe tener entre 4 y 12 caracteres.";
        }
        console.log(value);
        break;

      case "password2":
        if (value !== pass) {
          console.log(pass);
          error = "Las contraseñas deben coincidir.";
        }
        break;

      default:
        error = "Este campo es obligatorio.";
        break;
    }
  } else {
    error = "Este campo es obligatorio.";
  }
  return error;
};
