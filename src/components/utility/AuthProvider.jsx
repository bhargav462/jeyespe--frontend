import React,{createContext,useEffect} from 'react'
import Cookies from "js-cookie";
export const AuthContext=createContext('');
export const AuthUpdateContext=createContext();


export function AuthProvider(props) {
    const [user,setUser]=React.useState('')
    useEffect(() => {
        console.log('use effect called')
        // const loggedInUser = localStorage.getItem("user");
        const loggedInUser=Cookies.get("token")
        if (loggedInUser) {
            console.log('setting the user',loggedInUser)
          setUser(loggedInUser);
        }
        
      });
    return (
        <AuthContext.Provider value={user}>
        <AuthUpdateContext.Provider value={setUser}>
        {props.children}
        </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}
