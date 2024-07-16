import React,{useState} from 'react'
import axios from 'axios'

const Dashboard = () => {

    const [imgUrl, setImgUrl]= useState("");
    const [form, setForm]=useState({
        nombre:'',
        precio:0,
        detalles:'',
        imagenURL:''
    });

    const cambiarForm = (clave, valor) => {
        setForm(prevForm => ({
          ...prevForm,
          [clave]: valor
        }));
      };

    const changeUploadImg= async(e)=>{
        const file = e.target.files[0];

        const data = new FormData();

        data.append('file', file);
        data.append('upload_preset', "UniBurger");

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dkgl9ogsc/image/upload', data);
            setImgUrl(response.data.secure_url);
            cambiarForm('imagenURL', response.data.secure_url);
        } catch (error) {
            console.log(error);
        }


    }
    const deleteImagen=()=>{
        setImgUrl('');
        cambiarForm('imagenURL', '');
    }
    

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/postBurger', form);

            console.log('hamburguesa creada', response.data);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <h1>Panel de control</h1>
        <form onSubmit={handleSubmit}>
            <h2>crear una burger</h2>
            <input type="text" placeholder='Nombre' onChange={(e)=>cambiarForm('nombre', e.target.value)} />
            <input type="number" placeholder='Precio' onChange={(e)=>cambiarForm('precio', e.target.value)}/>
            <input type="text" placeholder='Descripción' onChange={(e)=>cambiarForm('detalles', e.target.value)}/>
            <input type="file" placeholder='imagen' onChange={changeUploadImg} />
            {
                imgUrl&&
                <div>
                    <img src={imgUrl} alt="" />
                    <button onClick={()=>deleteImagen()}>Eliminar Imagen</button>

                </div>
            }
            <button type="submit">Crear Burger</button>
        </form>
    </div>
  )
}

export default Dashboard