import React,{createContext,useEffect,useState} from 'react'
import Cookies from "js-cookie";
export const AuthContext=createContext('');
export const AuthUpdateContext=createContext();
export const RequestContext=createContext();


export function AuthProvider(props) {
    const [user,setUser]=useState('')
    const [requestProcessed,changeRequestStatus]=useState(false)
    // console.log('$$$$$$$$$$$$$',requestProcessed
    // )
    useEffect(() => {
        // console.log('use effect called')
        // const loggedInUser = localStorage.getItem("user");
        const loggedInUser=Cookies.get("token")
        fetch(process.env.REACT_APP_API_URL+'/token/check',{
          method:'POST',
          headers:{
            "content-Type": "application/json"
          },
          body:JSON.stringify({"token":loggedInUser})
        })
        .then(response=> response.json())
        .then(data=> {
          if(data.user==true) 
              setUser(loggedInUser)
          changeRequestStatus(true)
        })
        
      });
    return (
        <AuthContext.Provider value={user}>
        <AuthUpdateContext.Provider value={setUser}>
        <RequestContext.Provider value={requestProcessed}>
        {props.children}
        </RequestContext.Provider>
        </AuthUpdateContext.Provider>
      </AuthContext.Provider>
    )  
}
