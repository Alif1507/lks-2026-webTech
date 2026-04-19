import { createContext, useContext, useEffect, useState } from "react";
import API from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      API.get("/auth/me").then((res) => res.data).catch(logout);
    }
  }, [])

  const login = async (username, password) => {
    const { data } = await API.post("/auth/login", {
      username,
      password
    })

    localStorage.setItem("token", data.token);
    setUser(data.user || { username } )
    return data
  }

  const logout = async () => {
    try {
      await API.post("/auth/logout")
      localStorage.removeItem("token");
    } catch (_) {
      //
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{ children }</AuthContext.Provider>
  )
} 

export const  useAuth = () => useContext(AuthContext);