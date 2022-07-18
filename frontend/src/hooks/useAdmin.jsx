import useProyectos from "./useProyectos";
import useAuth from "./useAuth";
import ProyectosContext from '../context/ProyectosProvider'

import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

const useAdmin = () => {
    const { proyecto } = useContext(ProyectosContext)
    const { auth } = useContext(AuthContext)

    return proyecto.creador === auth._id
}

export default useAdmin