import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'

let socket;

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

                navigate('/proyectos')
            } catch (error) {
                setAuth({})
            }

            setCargando(false)
        }

        autenticarUsuario()
    }, [])
    
    const cerrarSesion = () => {
        try {
            const { data } = clienteAxios('/usuarios/logout')

            setAuth({})
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
