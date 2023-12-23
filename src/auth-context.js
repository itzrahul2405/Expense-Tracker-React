import React, { useState } from 'react'

const AuthContext = React.createContext();



export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const loginHandler = (token) => { 
        setIsLoggedIn(true) 
        localStorage.setItem('token', token)
    };

    const logoutHandler = () => { 
        setIsLoggedIn(false) 
        localStorage.removeItem('token')
    };

    const contextValue = {
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;