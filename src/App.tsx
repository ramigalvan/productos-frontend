import { useState } from 'react'
const URL = "http://localhost:8080/api/productos"

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoria: string
  fechaCreacion: string
  fechaActualizacion: string
  activo: boolean
}

function App() {
  const [productos, setProductos] = useState<Producto[]>([])

  const handleGetProductos = async () => {
    try {
      const resp = await fetch(URL);
      const dataJson = await resp.json();
      console.log(resp);
      setProductos(dataJson);

    } catch (err) {
      console.error("error tratando de hacer un fetch a la api:", err);

    }
  }

  return (
    <>
      <h1>Frontend de la API de productos, count state</h1>
      <button onClick={handleGetProductos}>get productos!</button>
      <ul>
        {
          productos.map((producto) =>
          <li key={producto.id}>{producto.nombre}</li>)
        }
      </ul>


    </>
  )
}

export default App
