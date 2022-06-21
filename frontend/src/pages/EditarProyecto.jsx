import useProyectos from '../hooks/useProyectos'
import { useEffect } from 'react'
import { useParams }from 'react-router-dom'

const EditarProyecto = () => {
  const params = useParams()
  
  const { obtenerProyecto, proyecto, cargando } = useProyectos()

  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  if(cargando) return 'Cargando...'

  return (
    <div>Editar Proyecto {proyecto.nombre}</div>
  )
}

export default EditarProyecto