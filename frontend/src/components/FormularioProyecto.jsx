import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

import { useContext } from 'react'
import ProyectosContext from '../context/ProyectosProvider'

const FormularioProyecto = () => {
  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')

  const params = useParams()

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useContext(ProyectosContext)
  
  useEffect(() => {
    if( params.id ){
      setId(proyecto?._id)
      setNombre(proyecto?.nombre)
      setDescripcion(proyecto?.descripcion)
      setFechaEntrega(proyecto?.fechaEntrega?.split('T')[0])
      setCliente(proyecto?.cliente)
    } else {
      setId(null)
    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre, descripcion, fechaEntrega, cliente].includes('')){
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })

      return;
    }

    // Pasa datos al provider
    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente })

    setId(null)
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')
  }
  
  return (
    <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow' onSubmit={handleSubmit}>
      {alerta.msg && <Alerta alerta={alerta} />}
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
        value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors' 
      />
    </form>
  )
}

export default FormularioProyecto