const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">Recupera Tu Contraseña Y No Pierdas Tus {''} <span className="text-slate-700">proyectos</span></h1>

      <form className="my-10 bg-white shadow rounded-lg px-10 py-5">
          <div className="my-5">
              <label htmlFor="password" className="uppercase text-gray-600 block text-md font-bold">Nuevo Password</label>
              <input id="password" type="password" placeholder="Escribe tu nuevo Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none" />
          </div>
          <div className="my-5">
              <label htmlFor="password2" className="uppercase text-gray-600 block text-md font-bold">Repetir Password</label>
              <input id="password2" type="password" placeholder="Repetir tu password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none" />
          </div>

          <input type="submit" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" value="Guardar nuevo password"/>
      </form>
    </>
  )
}

export default NuevoPassword
