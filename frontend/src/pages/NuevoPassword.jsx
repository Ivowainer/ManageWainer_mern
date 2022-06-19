import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'

const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [passwordModificada, setPasswordModificada] = useState(false)

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

  const handleSubmit = async e => {
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: "El password debe ser minimo 6 caracteres",
        error: true
      })

      return;
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: "Las passwords no son iguales",
        error: true
      })

      return;
    }
    
    setAlerta({})

    try {
      const url = `http://localhost:4000/api/usuarios/olvide-password/${token}`
      const { data } = await axios.post(url, { password })
      
      setAlerta({
        msg: data.msg,
        error: false
      })

      setPasswordModificada(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">Recupera Tu Contraseña Y No Pierdas Tus {''} <span className="text-slate-700">proyectos</span></h1>

      { alerta.msg && (
        <Alerta alerta={alerta} />
      ) }

      { tokenValido && (
        <form className="my-10 bg-white shadow rounded-lg px-10 py-5" onSubmit={handleSubmit}>
          <div className="my-5">
              <label htmlFor="password" className="uppercase text-gray-600 block text-md font-bold">Nuevo Password</label>
              <input 
                id="password" 
                type="password" 
                placeholder="Escribe tu nuevo Password" 
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none" 
                value={password}
                onChange={ e => setPassword(e.target.value) }
              />
          </div>
          <div className="my-5">
              <label htmlFor="password2" className="uppercase text-gray-600 block text-md font-bold">Repetir Password</label>
              <input 
                id="password2" 
                type="password" 
                placeholder="Repetir tu password" 
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-none" 
                value={repetirPassword}
                onChange={ e => setRepetirPassword(e.target.value) }
              />
          </div>

          <input type="submit" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" value="Guardar nuevo password"/>
        </form>
      )}

      { passwordModificada && <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>Iniciar Sesión</Link> }
    </>
  )
}

export default NuevoPassword
