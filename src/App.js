import React from "react";
import NavBar from './components/NavBar/NavBar'
import CustomCorousel from './components/Corousel/CustomCorousel'
import CustomCard from './CustomCard'
function App() {
  return (
    <div className="App">
        <NavBar/>
        <CustomCorousel/>
        <CustomCard/>
        <h1>About Red Sandalwood</h1>
        
    </div>
  );
}

export default App;
