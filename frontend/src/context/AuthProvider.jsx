import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider  = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const autenticarUsuario = async () => {
            try {
                const { data } = await clienteAxios('/usuarios/perfil')
                setAuth(data)

                /* navigate('/proyectos') */ //TODO: THIS
            } catch (error) {
                setAuth({})
            }

            setCargando(false)
        }

        autenticarUsuario()
    }, [])

    return (
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
