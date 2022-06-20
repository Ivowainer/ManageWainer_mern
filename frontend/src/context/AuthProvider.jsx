import { useState, useEffect, createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider  = ({ children }) => {

    const [hola, setHola] = useState('Hola')

    return (
        <AuthContext.Provider 
            value={{
                hola
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
