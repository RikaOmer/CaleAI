// AuthGuard.js

import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./AuthContext";

const AuthGuard = ({ children }) => {
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user, navigation]);

  return <>{user && children}</>;
};

export default AuthGuard;
