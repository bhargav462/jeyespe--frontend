import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Redirect } from "react-router-dom";
export default function AuthCheck(props) {
  const { user, setUser } = useContext(AuthContext);
//   if (!user) 
//     return <Redirect to="/#" />;
//   else
    return <>{props.children}</>;   
}
