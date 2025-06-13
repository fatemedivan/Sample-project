import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/sign-in')
        setToken(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return window.removeEventListener('storage',handleStorageChange)
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setToken(null);
    navigate('/sign-in')
  };
 return  <AuthContext.Provider value={{ logout, token }}>{children}</AuthContext.Provider>;
};
