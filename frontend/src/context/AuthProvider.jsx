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
            const token = localStorage.getItem('token')

            if(!token){
                setCargando(false)
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
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

            localStorage.clear()

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
