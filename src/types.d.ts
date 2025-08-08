export interface Producto {
  id?: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoria: string
  fechaCreacion?: string
  fechaActualizacion?: string
  activo?: boolean
}