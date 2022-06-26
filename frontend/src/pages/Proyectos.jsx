import PreviewProyecto from '../components/PreviewProyecto'
import useProyectos from '../hooks/useProyectos'

const Proyectos = () => {
  const { proyectos } = useProyectos()

  return (
    <>
      <h1 className='text-3xl font-black'>Proyectos</h1>

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