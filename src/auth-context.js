import React from 'react'

const AuthContext = React.createContext();

const contextValue = {
    isLoggedIn: isLoggedIn
}

const AuthContextProvider = () => {
    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default {AuthContext, AuthContextProvider};