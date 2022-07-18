import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

import { io } from 'socket.io-client'

const ProyectosContext = createContext()

const socket = io(import.meta.env.VITE_BACKEND_URL)

export const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([])
  const [proyecto, setProyecto] = useState({})
  const [alerta, setAlerta] = useState({})
  const [cargando, setCargando] = useState(false)
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
  const [tarea, setTarea] = useState({})
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
  const [colaborador, setColaborador] = useState({})
  const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
  const [buscador, setBuscador] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {

    const obtenerProyectos = async () => {
      try {

        const { data } = await clienteAxios('/proyectos')
        setProyectos(data)
        
      } catch (error) {
        console.log(error)
      }
    }
    
    obtenerProyectos()
    
  }, [proyectos])

  const mostrarAlerta = alerta => {
    setAlerta(alerta)

    setTimeout(() => {
      setAlerta({})
    }, 3000)
  }

  const submitProyecto = async proyecto => {
    if(proyecto.id){
      await editarProyecto(proyecto)
    } else {
      await nuevoProyecto(proyecto)
    }
  }

  const editarProyecto = async proyecto => {
    try {
      const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto)

      const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
      setProyectos(proyectosActualizados)

      setAlerta({
        msg: 'Proyecto Actualizado correctamente',
        error: false
      })

      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const nuevoProyecto = async proyecto => {
    try {

      const { data } = await clienteAxios.post('/proyectos', proyecto)

      setProyectos([...proyectos, data])
      
      setAlerta({
        msg: 'Proyecto creado correctamente',
        error: false
      })

      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerProyecto = async id => {
    setCargando(true)
    try {

      const { data } = await clienteAxios(`/proyectos/${id}`)
      setProyecto(data)
      setAlerta({})
    } catch (error) {
      navigate('/proyectos')
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000)
    } 

    setCargando(false)
  }

  const eliminarProyecto = async id => {
    try {

      const { data } = await clienteAxios.delete(`/proyectos/${id}`)

      const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
      setProyectos(proyectosActualizados)

      setAlerta({
        msg: data.msg,
        error: false
      })

      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea)
    setTarea({})
  }

  const submitTarea = async tarea => {
    if(tarea?.id){
      await editarTarea(tarea)
    } else {
      await crearTarea(tarea)
    }
  }

  const crearTarea = async tarea => {
    try {

      const { data } = await clienteAxios.post('/tareas', tarea)

      setAlerta({})
      setModalFormularioTarea(false)

      // SOCKET IO
      socket.emit('nueva_tarea', data)
    } catch (error) {
      console.log(error)
    }
  }

  const editarTarea = async tarea => {
    try {

      const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea)

      const proyectoActualizado = {...proyecto}
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)

      setProyecto(proyectoActualizado)

      setAlerta({})
      setModalFormularioTarea(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalEditarTarea = tarea => {
    setTarea(tarea)
    setModalFormularioTarea(true)
  }

  const handleModalEliminarTarea = tarea => {
    setTarea(tarea)
    setModalEliminarTarea(!modalEliminarTarea)
  }

  const eliminarTarea = async () => {
    try {

      const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`)

      const proyectoActualizado = {...proyecto}
      proyectoActualizado.tareas = proyectoActualizado.tareas?.filter(tareaState => tareaState._id !== tarea._id)
      setAlerta({
        msg: data.msg,
        error: false
      })
      setProyecto(proyectoActualizado)
      
      setModalEliminarTarea(false)
      setTarea({})
    } catch (error) {
      console.log(error)
    }
  }

  const submitColaborador = async email => {

    setCargando(true)
    try {

      const { data } = await clienteAxios.post('/proyectos/colaboradores', {email})

      setColaborador(data)
      setAlerta({})

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    setCargando(false)
  }

  const agregarColaborador = async email => {
    try {

      const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email)

      setAlerta({
        msg: data.msg,
        error: false
      })

      
      setColaborador('')

      setTimeout(() => {
        setAlerta({})

        navigate(-1)
      }, 3000)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador)
    setColaborador(colaborador)
  }

  const eliminarColaborador = async () => {
    try {

      const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id })

      const proyectoActualizado = {...proyecto}
      proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)

      setProyecto(proyectoActualizado)

      setAlerta({
        msg: data.msg,
        error: false
      })

      setTimeout(() => {
        setAlerta({})
      }, 3000)

      setColaborador({})
      setModalEliminarColaborador(false)
    } catch (error) {
      console.log(error)
    }
  }

  const completarTarea = async id => {
    try {

      const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {})

      const proyectoActualizado = {...proyecto}

      proyectoActualizado.tareas = proyecto.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)

      setProyecto(proyectoActualizado)
      setTarea({})
      setAlerta({})
    } catch (error) {
      console.log(error.response)
    }
  } 

  // SOCKET IO
  const submitTareasProyecto = tareaNueva =>{
    // Agrega task al state
    const proyectoActualizado = {...proyecto}
    proyectoActualizado.tareas = [...proyectoActualizado.tareas, tareaNueva]

    setProyecto(proyectoActualizado)
  }

  const handleBuscador = () => {
    setBuscador(!buscador)    
  }  
  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        handleModalEliminarTarea,
        modalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        handleBuscador,
        buscador,
        setBuscador,
        submitTareasProyecto
      }}
    >{children}
    </ProyectosContext.Provider>
  )
}

export default ProyectosContext