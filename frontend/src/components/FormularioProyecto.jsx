import { useState } from 'react'

const FormularioProyecto = () => {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')
  
  return (
    <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
      <div className="mb-5">
        <label htmlFor="nombre" className='text-gray-700 uppercase font-bold text-sm'>Nombre Proyecto</label>
        <input 
          id='nombre'
          type="text" 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none'
          placeholder='Nombre del Proyecto'
          value={nombre}
          onChange={ e => setNombre(e.target.value) }
        />
      </div>

      <div className="mb-5">
        <label htmlFor="descripcion" className='text-gray-700 uppercase font-bold text-sm'>Descripción Proyecto</label>
        <textarea 
          id='descripcion'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none'
          placeholder='Descripción del Proyecto'
          value={descripcion}
          onChange={ e => setDescripcion(e.target.value) }
        />
      </div>

      <div className="mb-5">
        <label htmlFor="fecha-entrega" className='text-gray-700 uppercase font-bold text-sm'>Fecha de Entrega del Proyecto</label>
        <input
          id='fecha-entrega'
          type="date"
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none'
          value={fechaEntrega}
          onChange={ e => setFechaEntrega(e.target.value) }
        />
      </div>

      <div className="mb-5">
        <label htmlFor="cliente" className='text-gray-700 uppercase font-bold text-sm'>Cliente Proyecto</label>
        <input 
          id='cliente'
          type="text" 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none'
          placeholder='Cliente del Proyecto'
          value={cliente}
          onChange={ e => setCliente(e.target.value) }
        />
      </div>

      <input 
        type="submit" 
        value="Crear Proyecto" 
        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors' 
      />
    </form>
  )
}

export default FormularioProyecto