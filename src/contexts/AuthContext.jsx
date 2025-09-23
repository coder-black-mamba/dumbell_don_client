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
  const [subscription, setSubscription] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authApiClient.get("auth/users/me/");
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout();
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (userData) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post("auth/jwt/create/", {
        email: userData.email,
        password: userData.password,
      });

      const authToken = response.data;
      
      localStorage.setItem("token", JSON.stringify(authToken));
      setToken(authToken);
      console.log("authToken",authToken);

      const user = await fetchUser();
      if (!user) throw new Error("Failed to fetch user data");
      console.log("user",user);
      setUser(user);
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data || error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  const fetchMembership = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authApiClient.get("/subscriptions/");
      const subscriptionsData = response.data;


      const today = new Date();
      const selectedSubscription = subscriptionsData.find((subscription) => {
        const startDate = new Date(subscription.start_date);
        const endDate = new Date(subscription.end_date);
        return (
          startDate <= today &&
          endDate >= today &&
          subscription.status === "ACTIVE"
        );
      });

      setSubscription(selectedSubscription);
      console.log("selectedSubscription",selectedSubscription);
      console.log("subscriptionsData",subscriptionsData);
      return selectedSubscription;
    } catch (error) {
      console.error("Error fetching membership:", error);
      setError("Failed to load membership data");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []); // Add any dependencies if needed

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(JSON.parse(storedToken));
      }

      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUser(user);

        // Only fetch membership if we have a valid token
        
      }
    };

    initializeAuth();
    fetchMembership();
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      subscription,
      fetchMembership,
      token,
      isAuthenticated: !!user,
      isAdmin: user?.role === "ADMIN",
      isStaff: user?.role === "STAFF",
      isMember: user?.role === "MEMBER",
      login,
      logout,
      fetchUser,
      error,
    }),
    [
      user,
      token,
      login,
      logout,
      fetchUser,
      error,
      subscription,
      fetchMembership,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
