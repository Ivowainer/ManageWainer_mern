import useProyectos from '../hooks/useProyectos'

const Proyectos = () => {
  const { proyectos } = useProyectos()

  return (
    <>
      <h1 className='text-3xl font-black'>Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ? <p>Si hay proyectos</p> : <p className='mt-5 text-center text-gray-600 uppercase p-5'>No hay proyectos aún</p>}
      </div>
    </>
  )
}

export default Proyectos