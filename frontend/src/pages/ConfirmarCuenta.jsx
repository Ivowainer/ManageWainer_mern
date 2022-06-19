import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const confirmarCuenta = async () => {
      const url = `/usuarios/confirmar/${id}`

      try {
        const { data } = await clienteAxios(url)

        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    confirmarCuenta()
  }, [])

  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">Confirma tu cuenta y comienza a crear tus {''} <span className="text-slate-700">proyectos</span></h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-1 rounded-xl bg-white">
        {alerta.msg && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to="/" className='block text-center my-5 text-slate-500 uppercase text-sm'>Iniciar Sesión</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta