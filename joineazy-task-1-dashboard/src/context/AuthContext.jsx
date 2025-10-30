import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedIfEmpty, storage } from "../lib/storage.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    seedIfEmpty();
    try {
      const raw = localStorage.getItem("je.currentUser");
      if (raw) setUser(JSON.parse(raw));
    } finally {
      setHydrated(true);
    }
  }, []);

  const login = (email) => {
    const users = storage.get("users") || [];
    const norm = String(email || "").trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === norm);
    if (!found)
      throw new Error("User not found. Try admin@uni.edu, s1@uni.edu, or s2@uni.edu");
    localStorage.setItem("je.currentUser", JSON.stringify(found));
    setUser(found);
  };

  const logout = () => {
    localStorage.removeItem("je.currentUser");
    setUser(null);
  };

  const value = useMemo(() => ({ user, hydrated, login, logout }), [user, hydrated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
