import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     
  const [token, setToken] = useState(null);    

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
  }, []);

  const login = (userData, token) => {
  const normalizedUser =
    typeof userData === "string" ? { username: userData } : userData;

  setUser(normalizedUser);
  setToken(token);

  localStorage.setItem("user", JSON.stringify(normalizedUser));
  localStorage.setItem("token", token);
};


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
