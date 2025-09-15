import { useContext } from "react";
import { AuthContext } from "../contexts/authContextCreate"

export const useAuth = () => useContext(AuthContext);
