import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HomePageCard from "./HomePageCard";
import BotanicImage from "./about1.jpg";
import ChemistryImage from "./about2.jpg";
import WoodImage from "./about3.jpg";
import MedicalImage from "./about4.jpg";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import VisibilitySensor from "react-visibility-sensor";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IconButton } from '@material-ui/core';

const info = [
  {
    imgURL: BotanicImage,
    heading: "Botanical Name:",
    description: "Pterocarpus santalinus",
  },
  {
    imgURL: ChemistryImage,
    heading: "Chemical composition:",
    description:
      "Pterocarpus, Santalinus A,B, Pterocarputriol, Pterocar vodiolone, lupuediol, pterostilbene, homopterocas.",
  },
  {
    imgURL: WoodImage,
    heading: "Parts Used:",
    description: "Heart wood and bark.",
  },
  {
    imgURL: MedicalImage,
    heading: "Medicinal Properties:",
    description: (
      <>
        <p>
          Is issued in traditional herbal medicine as an anti-pyretic,
          anti-inflammatory, anthelmionitc, tonic, hemorrhage, dysentery,
          aphrodisiac, anti-hyper glycemic and diaphoretic.
        </p>
        <p>
          Used in diabetics wood extract called pterosibilic used in sex pills
          (Viagra) in china, fruition, carving and musical instruments. Used to
          produce red pigmentation called sentelin used as colouring agent in
          alcohol industries. In sea food and cosmetics.
        </p>
        <p>
          Used as coolant in nuclear reactors in China. Endangered species of
          wild flora and fauna of which India is signatory sex pills similar to
          Viagra. Viagra could be potentially used to treat attitude sickness.
        </p>
      </>
    ),
  },
];

const useStyles = makeStyles({
  marginCenter: {
    margin: "5%",
  },
});

function handleVisibilityChange(idx,setSliderState,sliderState)
{
  // console.log('toggled slider state '+idx)
    let prevState=[...sliderState];
    prevState[idx]=true;
    setSliderState(prevState)
}

export default function About() {
  const classes = useStyles();
  const temp=new Array(info.length)
  temp.fill(false)
  const [sliderState,setSliderState]=React.useState(temp)

  return (
    <div className={classes.marginCenter}>
      <HomePageCard />
      <h1 style={{margin:'20px 0px'}}>About Red Sandalwood</h1>
      {info.map((parah, id) => {
        let idx=id
        return (
          <VisibilitySensor onChange={isVisible=> {
            if(isVisible==true)
            handleVisibilityChange(idx,setSliderState,sliderState)
          }}>

          <Grid
            container
            style={{ marginTop: "20px" }}
            alignItems="center"
            direction={idx % 2 == 0 ? "row" : "row-reverse"}
          >
            <Grid item xs={12} md={6}>
              <Slide
                direction={idx%2==0 ? "right" : "left"}
                in={sliderState[idx]}
                timeout={3000}
              >
          
                <img src={parah.imgURL} style={{ width: "100%" }}></img>

              </Slide>
            </Grid>

            <Grid item xs={12} md={6} style={{ paddingLeft: "20px" }}>
              <Typography variant="h5">{parah.heading}</Typography>
              <Typography>{parah.description}</Typography>
            </Grid>
          </Grid>
          </VisibilitySensor>

        );
      })}
    </div>
  );
}
