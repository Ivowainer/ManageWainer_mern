import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'

const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})

  const { token } = useParams()

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await axios(`http://localhost:4000/api/usuarios/olvide-password/${token}`)

        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    comprobarToken()
  }, [])

  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">Recupera Tu Contraseña Y No Pierdas Tus {''} <span className="text-slate-700">proyectos</span></h1>

      { tokenValido ? (
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
      ) : (
        <Alerta alerta={alerta} />
      )}
    </>
  )
}

export default NuevoPassword
