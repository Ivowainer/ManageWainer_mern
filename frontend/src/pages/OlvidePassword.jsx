import { Link } from 'react-router-dom'

const OlvidePassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">Recupera tu contraseña y no pierdas tus {''} <span className="text-slate-700">proyectos</span></h1>

      <form className="my-10 bg-white shadow rounded-lg px-10 py-5">
          <div className="my-5">
              <label htmlFor="email" className="uppercase text-gray-600 block text-md font-bold">Email</label>
              <input id="email" type="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none" />
          </div>

          <input type="submit" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" value="Enviar Instrucciones"/>
      </form>

      <nav className="lg:flex lg:justify-between">
          <Link to="/registrar" className='block text-center my-5 text-slate-500 uppercase text-sm'>¿No tienes una cuenta? Regístrate</Link>
      </nav>
    </>
  )
}

export default OlvidePassword