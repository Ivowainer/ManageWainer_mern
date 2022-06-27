import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between md:items-center">
            <h2 className="text-4xl text-sky-600 font-black text-center md:mb-0"><Link to="/proyectos">ManagerWainer</Link></h2>

            

            <div className='flex flex-col gap-4 items-center md:flex-row'>
              <button 
                type='button'
                className='font-bold uppercase'
              >Buscar Proyecto</button>
                <Link to="/proyectos" className='font-bold uppercase'>Proyectos</Link>

                <button type='button' className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'>Cerrar Sesión</button>
            </div>
        </div>
    </header>
  )
}

export default Header