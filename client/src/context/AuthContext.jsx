import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("sprintflow-auth");
    return saved ? JSON.parse(saved) : { token: "", user: null };
  });

  useEffect(() => {
    localStorage.setItem("sprintflow-auth", JSON.stringify(auth));
  }, [auth]);

  const login = (payload) => setAuth(payload);
  const logout = () => setAuth({ token: "", user: null });

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        user: auth.user,
        isAuthenticated: Boolean(auth.token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
