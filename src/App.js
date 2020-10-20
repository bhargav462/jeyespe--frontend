import React from "react";
import NavBar from './components/NavBar/NavBar'
import CustomCorousel from './components/Corousel/CustomCorousel'
import About from './components/About/About'
import Footer from './components/Footer/Footer'
function App() {
  return (
    <div className="App">
        <NavBar/>
        <CustomCorousel/>
        <About/>
        <Footer/>
    </div>
  );
}

export default App;
