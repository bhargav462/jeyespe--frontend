import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import HomePageCard from './HomePageCard'
import BotanicImage from './about1.jpg'
import ChemistryImage from './about2.jpg'
import WoodImage from './about3.jpg'
import MedicalImage from './about4.jpg'
import Grid from '@material-ui/core/Grid';
const info=[
    {
        imgURL: BotanicImage,
        heading: 'Botanical Name:',
        description:'Pterocarpus santalinus'
    },
    {
        imgURL: ChemistryImage,
        heading: 'Chemical composition:',
        description:'Pterocarpus, Santalinus A,B, Pterocarputriol, Pterocar vodiolone, lupuediol, pterostilbene, homopterocas.'
    },
    {
        imgURL: WoodImage,
        heading: 'Parts Used:',
        description:'Heart wood and bark.'
    },
    {
        imgURL: MedicalImage,
        heading:'Medicinal Properties:',
        description:<><p>Is issued in traditional herbal medicine as an anti-pyretic, anti-inflammatory, anthelmionitc, tonic, hemorrhage, dysentery, aphrodisiac, anti-hyper glycemic and diaphoretic.</p>
        <p>Used in diabetics wood extract called pterosibilic used in sex pills (Viagra) in china, fruition, carving and musical instruments. Used to produce red pigmentation called sentelin used as colouring agent in alcohol industries. In sea food and cosmetics.</p>
        <p>Used as coolant in nuclear reactors in China. Endangered species of wild flora and fauna of which India is signatory sex pills similar to Viagra. Viagra could be potentially used to treat attitude sickness.</p></>
    }
]

const useStyles = makeStyles({
    marginCenter:{
        margin: '5%'
    }
})

export default function About(){
    const classes=useStyles()
    return <div className={classes.marginCenter}>
        <HomePageCard/>
        <h1>About Red Sandalwood</h1>
        {
            info.map((parah,idx)=> {
                return   <Grid container style={{marginTop:'20px'}} 
                                alignItems='center'
                                direction={(idx%2==0)?'row':'row-reverse'}>
                             <Grid item xs={12} md={6}  >
                                <img src={parah.imgURL} style={{width:'100%'}}></img>
                             </Grid>
                    
                             <Grid item xs={12} md={6} style={{paddingLeft:'20px'}}>
                               <h1>{parah.heading}</h1>
                                <p>{parah.description}</p>
                             </Grid>
                         </Grid> 
                    })
        }
    </div>
}