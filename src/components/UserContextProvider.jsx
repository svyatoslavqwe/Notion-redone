import React, { createContext, useEffect, useState } from "react";
import { fetchUserById } from "../api";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const id = localStorage.getItem("userId");
    if (id) {
      fetchUserById(id)
        .then((user) => {
          setUser(user);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("userId", user.id);
    }
  }, [user?.id]);

  return (
    <UserContext.Provider value={{ user, onChange: setUser, loading }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
}
