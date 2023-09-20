import { createContext, useEffect } from "react";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const allAuthContext = useUser();
 
  return (
    <>
      <AuthContext.Provider value={allAuthContext}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
