import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import Tarea from '../components/Tarea'
import Alerta from '../components/Alerta'
import Colaborador from '../components/Colaborador'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import useAdmin from '../hooks/useAdmin'

import { io } from 'socket.io-client'

import { useContext } from 'react'
import ProyectosContext from '../context/ProyectosProvider'

const socket = io(import.meta.env.VITE_BACKEND_URL)

const Proyecto = () => {
  const { obtenerProyecto, proyecto, cargando, handleModalTarea, submitTareasProyecto, eliminarTareaProyecto, actualizarTareaProyecto, cambiarEstadoTarea } = useContext(ProyectosContext)
  const admin = useAdmin()
  
  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)

    socket.emit('abrir_proyecto', params.id)
    console.log(proyecto._id)
  }, [])

  useEffect(() => {
    socket.on('agregar_tarea', tareaNueva => {
      if(tareaNueva.proyecto === proyecto._id){
        submitTareasProyecto(tareaNueva)
      }
    })

    socket.on('tarea_eliminada', tareaEliminada => {
      if(tareaEliminada.proyecto === proyecto._id){
        eliminarTareaProyecto(tareaEliminada)
      }
    })

    socket.on('tarea_actualizada', tareaActualizada => {
      if(tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada)
      }
    })

    socket.on('nuevo_estado', nuevoEstadoTarea => {
      if(nuevoEstadoTarea.proyecto._id === proyecto._id){
        cambiarEstadoTarea(nuevoEstadoTarea)
      }
    })
  })

  if(cargando) return 'Cargando...'

  return (
      <>
        <div className='flex justify-between'>
          <h1 className='font-black text-4xl'>{proyecto.nombre}</h1>

          {admin && (
            <div>
              <Link className='flex items-center gap-2 text-gray-400 hover:text-black cursor-pointer' to={`/proyectos/editar/${params.id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Editar
              </Link>
            </div>
          )}
          
        </div>
          
        {admin && (
          <button 
          onClick={handleModalTarea} 
          type='button' 
          className='flex gap-2 items-center justify-center text-sm px-5 py-3 w-full md:w-auto rounded-lg mt-5 uppercase font-bold bg-sky-400 text-white text-center'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Nueva Tarea
          </button>
        )}
        

        <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

        <div className=" flex flex-col  mt-10 rounded-lg">
          {proyecto.tareas?.length ? (
            proyecto.tareas?.map(tarea => (
              <Tarea key={tarea._id} tarea={tarea} />
            ))
          ) : <p className='text-center my-5 p-10'>No hay tareas en este proyecto</p>}
        </div>

        

        {admin && (
          <>
            <div className="flex items-center justify-between mt-10">
              <p className='font-bold text-xl'>Colaboradores</p>

              <button className='px-4 py-3 bg-gray-700 rounded-md'>
                <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`} className="text-white uppercase font-bold">Añadir</Link>
              </button>
            </div>
            
            <div className=" flex flex-col  mt-10 rounded-lg">
              {proyecto.colaboradores?.length ? (
                proyecto.colaboradores?.map(colaborador => (
                  <Colaborador key={colaborador._id} colaborador={colaborador}/>
                ))
              ) : <p className='text-center my-5 p-10 border-b mb-2 bg-white shadow'>No hay colaboradores en el proyecto</p>}
            </div>
          </>
        )}

        <ModalFormularioTarea />
        <ModalEliminarTarea />
        <ModalEliminarColaborador />
      </>
    )
}

export default Proyecto