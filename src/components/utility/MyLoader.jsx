import React from 'react'
import RingLoader from "react-spinners/RingLoader";

export function MyLoader(){
    return  <div style={{minHeight:'100vh',display:'flex'
    ,justifyContent:'center',alignItems:'center'}}>  <RingLoader size={150}
     color={"brown"}  loading={true}/>
  </div>
}