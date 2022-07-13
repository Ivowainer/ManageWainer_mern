import { useEffect } from 'react'

import Alerta from '../components/Alerta'
import PreviewProyecto from '../components/PreviewProyecto'
import useProyectos from '../hooks/useProyectos'

import io from 'socket.io-client'

let socket;

const Proyectos = () => {
  const { proyectos, alerta } = useProyectos()

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('prueba', proyectos)
  }, [])

  return (
    <>
      <h1 className='text-3xl font-black'>Proyectos</h1>

      {alerta?.msg && <Alerta alerta={alerta} />}

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ? 
          proyectos.map(proyecto => (
            <PreviewProyecto proyecto={proyecto} key={proyecto._id} />
          ))
        : <p className='text-center text-gray-600 p-5 uppercase my-5 border-b mb-2 bg-white shadow'>No hay proyectos aún</p>}
      </div>
    </>
  )
}

export default Proyectos