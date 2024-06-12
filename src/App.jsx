import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Info from './pages/Info'

function App() {

  // const catalogo = [{ nombre: "hamburguesa completa", precio: "2200" }, { nombre: "hamburguesa doble", precio: "3200" }, {nombre: "chesseBurger", precio: "2500"}]

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/detalles/:id' element={<Info/>}/>
    </Routes>
  )
}

export default App