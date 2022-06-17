import { Link } from 'react-router-dom'

const Registrar = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">Crea tu cuenta y Administra tus {''} <span className="text-slate-700">proyectos</span></h1>

      <form className="my-10 bg-white shadow rounded-lg px-10 py-5">
          <div className="my-5">
              <label htmlFor="nombre" className="uppercase text-gray-600 block text-md font-bold">Nombre</label>
              <input id="nombre" type="text" placeholder="Tu Nombre" className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none" />
          </div>
          <div className="my-5">
              <label htmlFor="email" className="uppercase text-gray-600 block text-md font-bold">Email</label>
              <input id="email" type="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none" />
          </div>
          <div className="my-5">
              <label htmlFor="password" className="uppercase text-gray-600 block text-md font-bold">Password</label>
              <input id="password" type="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none" />
          </div>
          <div className="my-5">
              <label htmlFor="password2" className="uppercase text-gray-600 block text-md font-bold">Repetir Password</label>
              <input id="password2" type="password" placeholder="Repetir tu password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none" />
          </div>

          <input type="submit" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" value="Crear Cuenta"/>

      </form>

      <nav className="lg:flex lg:justify-between">
          <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link to="/olvide-password" className='block text-center my-5 text-slate-500 uppercase text-sm'>Olvidé mi password</Link>
      </nav>
    </>
  )
}

export default Registrar