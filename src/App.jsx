import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Info from './pages/Info/Info'
import Dashboard from './pages/Dashboard/Dashboard'
import Register from './pages/Register/Register'
import Edit from './pages/EditProfile/Edit'
import Carrito from './pages/Carrito/Carrito'

function App() {

  // const catalogo = [{ nombre: "hamburguesa completa", precio: "2200" }, { nombre: "hamburguesa doble", precio: "3200" }, {nombre: "chesseBurger", precio: "2500"}]

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/detalles/:id' element={<Info/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/editarPerfil/:usuario' element={<Edit/>}/>
      <Route path='/carrito' element={<Carrito/>}/>
    </Routes>
  )
}

export default App