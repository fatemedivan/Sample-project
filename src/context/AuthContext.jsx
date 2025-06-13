
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadAuthData = () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Failed to load auth data from localStorage", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setLoading(false); 
      }
    };

    loadAuthData();
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'token' || event.key === 'user') {
        const newToken = localStorage.getItem("token");
        const newUser = localStorage.getItem("user");

        if (!newToken) {
          setToken(null);
          setUser(null);
        
          if (window.location.pathname !== '/sign-in' &&
              window.location.pathname !== '/sign-up' &&
              window.location.pathname !== '/verify-otp') {
              navigate('/sign-in');
          }
        } else {
          setToken(newToken);
          try {
            setUser(JSON.parse(newUser));
          } catch (e) {
            console.error("Failed to parse user from localStorage on storage change", e);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            if (window.location.pathname !== '/sign-in' &&
                window.location.pathname !== '/sign-up' &&
                window.location.pathname !== '/verify-otp') {
                navigate('/sign-in');
            }
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [token, user, navigate]);

  const updateAuthData = (newToken, newUserData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUserData));
  

    setToken(newToken);
    setUser(newUserData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setToken(null);
    setUser(null);
    navigate('/sign-in');
  };

  return (
    <AuthContext.Provider value={{ logout, token, user, updateAuthData, loading }}> 
      {children}
    </AuthContext.Provider>
  );
};