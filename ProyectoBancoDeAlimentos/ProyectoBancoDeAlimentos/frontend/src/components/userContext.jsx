import { createContext, useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUserRole(null);
          return;
        }

        const res = await axiosInstance.get("/api/auth/me");
        setUserRole(res.data.rol);
      } catch (err) {
        console.error("Error al obtener rol del usuario:", err);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <UserContext.Provider value={{ userRole, loading, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
