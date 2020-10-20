import React from "react";
import NavBar from './components/NavBar/NavBar'
import CustomCorousel from './components/Corousel/CustomCorousel'
import CustomCard from './CustomCard'
import Grid from '@material-ui/core/Grid';
import img1 from './logo.svg'
function App() {
  return (
    <div className="App">
        <NavBar/>
        <CustomCorousel/>
        <CustomCard/>
        <h1>About Red Sandalwood</h1>
        <Grid container>
        <Grid item xs={6} md={6}>
              <img src={img1}></img>
        </Grid>
        <Grid item xs={6} md={6}>
            <h1>Botanical Name:</h1>
            <p>Pterocarpus santalinus</p>
        </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
            <h1>Chemical composition:</h1>
            <p>Pterocarpus, Santalinus A,B, Pterocarputriol, Pterocar vodiolone, lupuediol, pterostilbene, homopterocas.</p>
        </Grid>
        <Grid item xs={12} md={6}>
            <img src={img1}></img>
        </Grid>
        
    </div>
  );
}

export default App;
