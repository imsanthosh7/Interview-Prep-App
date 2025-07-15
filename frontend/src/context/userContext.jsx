import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_PATHS } from "../utils/apipath";


export const UserContext = createContext();


export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const { response } = await axios.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();

      } finally {
        setLoading(false);
      }
    }

    fetchUser();

  }, []);



  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  }


  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  }



  const value = {
    user,
    loading,
    updateUser,
    clearUser,
  }

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )

}