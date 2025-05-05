import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authcontext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Deu Errado');
  }
  return context;
}