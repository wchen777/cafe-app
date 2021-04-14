import React, { createContext, useState, useContext } from 'react'


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({})
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          userData,
          setUserData
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export const AuthContext = createContext({});

//   export const useAuthContext = useContext(AuthContext)