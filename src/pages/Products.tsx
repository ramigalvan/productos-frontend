import { useState, type ChangeEvent, type FormEvent } from "react"
import type { Producto } from "../types";

//TODO: post products
function Products() {
    const [productoForm, setProductoForm] = useState<Producto>({
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        categoria: ''
    });
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string>('')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setProductoForm(prev => ({
            ...prev,
            [name]: name === "precio" || name === "stock"
                ? parseFloat(value) || 0
                : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const { categoria, stock, nombre, descripcion, precio } = productoForm;
        if (!nombre || !descripcion || !categoria || stock <= 0 || precio <= 0) {
            setMessage("Por favor completa todos los campos correctamente")
            return
        }
        setLoading(true)
        setMessage('')

        try {
            const response = await fetch("http://localhost:8080/api/productos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productoForm)
            });

            if (response.ok) {
                const nuevoProducto = await response.json()
                setMessage("Producto creado exitosamente")

                setProductoForm({
                    nombre: '', descripcion: '', precio: 0, stock: 0, categoria: ''
                });

            } else {
                const error = await response.text()
                setMessage(`Error: ${error}`)
            }
        } catch (error) {
            setMessage(`Error de conexion: ${error instanceof Error ? error.message : 'Error desconocido'}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2>welcome to page Products</h2>
            <section>
                <h3>post products</h3>
                {
                    message &&
                    <div >
                        {message}
                    </div>
                }
                <form
                    style={{ display: "flex", flexDirection: "column", alignItems: "start" }}
                    onSubmit={handleSubmit} >

                    <label htmlFor="nombre">nombre</label>
                    <input type="text" name="nombre" value={productoForm.nombre} onChange={handleInputChange} disabled={loading} required />

                    <label htmlFor="descripcion">descripcion</label>
                    <input type="text" name="descripcion" value={productoForm.descripcion} onChange={handleInputChange} disabled={loading} required />

                    <label htmlFor="precio">precio</label>
                    <input type="number" name="precio" value={productoForm.precio} onChange={handleInputChange} disabled={loading} min="0" step="0.01" required />

                    <label htmlFor="stock">stock</label>
                    <input type="number" name="stock" value={productoForm.stock} onChange={handleInputChange} disabled={loading} min="0" required />

                    <label htmlFor="categoria">categoria</label>
                    <input type="text" name="categoria" value={productoForm.categoria} onChange={handleInputChange} disabled={loading} required />

                    <button
                        type="submit"
                        disabled={loading}
                    >{loading ? 'Creando...' : 'Crear Producto'}</button>
                </form>
            </section>
        </div>
    )
}

export default Products