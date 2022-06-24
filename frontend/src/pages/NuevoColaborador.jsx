import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormularioColaborar from "../components/FormularioColaborar"
import useProyectos from '../hooks/useProyectos'

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargando } = useProyectos()

  const params = useParams()

  useEffect(() => { 

  }, [])

  if(cargando) return 'Cargando...'

  return (
    <>
      <h1 className="text-3xl font-black">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborar />
      </div>
    </>
  )
}

export default NuevoColaborador