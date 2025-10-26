import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../config/api";
import useTokenExpirationMonitor from "../hooks/useTokenExpirationMonitor";

export const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Initialize user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const studentData = localStorage.getItem("studentData");

    if (token && studentData) {
      const student = JSON.parse(studentData);
      setUser({ student, token });
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false); // Mark loading as complete
  }, []);

  // Monitor token expiration
  useTokenExpirationMonitor(user?.token, () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("studentData");
    delete api.defaults.headers.common["Authorization"];

    setUser(null);

    // Use window.location for navigation outside Router context
    window.location.href = "/login";
  });

  const login = (userData) => {
    manageDetails(userData);
  };

  const register = (userData) => {
    manageDetails(userData);
  };

  const manageDetails = (userData) => {
    const { student, token } = userData;

    localStorage.setItem("authToken", token);
    localStorage.setItem("studentData", JSON.stringify(student));

    setUser(userData);

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };

  const logOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("studentData");
    delete api.defaults.headers.common["Authorization"];

    setUser(null);

    // Use window.location for navigation outside Router context
    window.location.href = "/login";
  };

  const contextValue = {
    user,
    login,
    register,
    logOut,
    loading
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
