import React, {useContext, useState} from 'react'

const AuthenticationContext = React.createContext();

export function useAuthentication() {
    return useContext(AuthenticationContext);
}

export function AuthenticationProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [jwt, setJwt] = useState('');
    const value = {
        currentUser,
        setCurrentUser,
        setJwt,
        jwt,
    }
    
    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    )
}
