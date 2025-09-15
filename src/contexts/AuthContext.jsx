import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router";
import { apiClient, authApiClient } from "../services/apiServices";
import React from "react";
import { AuthContext } from "./authContextCreate";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await authApiClient.get("auth/users/me/");
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout();
      return null;
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await apiClient.post("auth/jwt/create/", {
        email: userData.email,
        password: userData.password,
      });

      const authToken = response.data;
      localStorage.setItem("token", JSON.stringify(authToken));
      setToken(authToken);

      const user = await fetchUser();
      if (!user) throw new Error("Failed to fetch user data");

      setUser(user);
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data || error.message);
      throw error;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  const value = React.useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
      isStaff: user?.role === "staff",
      login,
      logout,
      fetchUser,
      error,
    }),
    [user, token, login, logout, fetchUser, error]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


 