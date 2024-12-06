"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useAuth } from "../authContext";

const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, userLoggedIn } = useAuth();
  const fetchUserDetails = async () => {
    const token = await currentUser?.getIdToken();
    setLoading(true);
    try {
      const user = await axios.get("http://localhost:9000/api/v1/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(user.data.user);
      setUserDetails(user.data.user);
      console.log("user details updated: ", userDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if(userLoggedIn){
      fetchUserDetails();
    }
  }, [userLoggedIn]);

  const value = {
    userDetails,
    setUserDetails
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}

export function useGetUserDetails() {
  return useContext(UserContext);
}
