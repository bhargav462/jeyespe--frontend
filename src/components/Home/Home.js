import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import HomePageCard from "./HomePageCard";
import BotanicImage from "./about1.jpg";
import ChemistryImage from "./about2.jpg";
import WoodImage from "./about3.jpg";
import MedicalImage from "./about4.jpg";
import Grid from "@material-ui/core/Grid";
import { createStyles, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import VisibilitySensor from "react-visibility-sensor";
import RowButtons from "./RowButtons/RowButtons";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Stripe from "../utility/Stripe";
import parallax1 from "./parallax1.jpg";
import { StyledButton } from "../utility/StyledButton";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Flipkart from './partners/flipkart.jpg'
import Amazon from './partners/amazon.png'
import IndiaMart from './partners/indiamart.jpg'
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

const useStyles = makeStyles((theme) =>
  createStyles({
    marginCenter: {
      margin: "5%",
    },
    stripeContainer: {
      height: "400px",
      width: "100%",
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "100px 0px",
    },
    content: {
      color: "white",
      width: "80%",
    },
    showAbovexs:{
      [theme.breakpoints.down('sm')]:{
       display:'none'
    }

    },    
    showBelowxs:{
      [theme.breakpoints.up('sm')]:{
          display:'none'
      }

    }

  })
);

function handleVisibilityChange(idx, setSliderState, sliderState) {
  let prevState = [...sliderState];
  prevState[idx] = true;
  setSliderState(prevState);
}

export default function About() {
  const classes = useStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const temp = new Array(info.length);
  temp.fill(false);
  const [sliderState, setSliderState] = React.useState(temp);

  return (
    <div>
      <div>
        <div className={classes.marginCenter}>
          <HomePageCard />
        </div>
        <Stripe image={parallax1}>
          <h1>
            We Buy Red Pine Poles, Softwood, Hardwood & Standing Timber!
          </h1>
        </Stripe>

        <h1 style={{ margin: "40px 0px", textAlign: "center" }}>
          About Red Sandalwood
        </h1>
        <div className={classes.marginCenter}>
          {info.map((parah, id) => {
            let idx = id;
            return (
              <VisibilitySensor
                onChange={(isVisible) => {
                  if (isVisible == true)
                    handleVisibilityChange(idx, setSliderState, sliderState);
                }}
              >
                <Grid
                  container
                  style={{ marginTop: "20px" }}
                  alignItems="center"
                  direction={idx % 2 == 0 ? "row" : "row-reverse"}
                >
                  <Grid item xs={12} md={6}>
                   {
                     matches ?   <Slide
                      direction={idx % 2 == 0 ? "right" : "left"}
                      in={sliderState[idx]}
                      timeout={3000}
                      
                    >
                      <img  src={parah.imgURL} style={{ width: "100%" }}></img>
                    </Slide>
                    :
                    <img src={parah.imgURL} style={{ width: "100%" }}></img>
                   }
                  </Grid>

                  <Grid item xs={12} md={6} style={{ paddingLeft: "20px" }}>
                    <Typography variant="h3">{parah.heading}</Typography>
                    <Typography variant="p">{parah.description}</Typography>
                  </Grid>
                </Grid>
              </VisibilitySensor>
            );
          })}
        </div>
      </div>

      {/* start of next segment */}
      <div
        style={{
          textAlign: "center",
          margin: "100px 0px",
          padding: "40px",
          backgroundColor: "#f0ece0",
        }}
      >
        <h1 style={{ marginBottom: "60px" }}>What we do</h1>

        <RowButtons />

        <Box mt={4} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
        </Box>
      </div>

      <Box
        style={{
          textAlign: "center",
          backgroundColor: "#f0ece0",
          height: "400px",
        }}
      >
        <h3 style={{ color: "black",paddingTop:'100px' }}>
          Meet Our Partners
        </h3>
        <Box display="flex" justifyContent="space-around" my={6}>
          <img src={Amazon} style={{width:'150px'}}/>
          <img src={Flipkart} style={{width:'150px'}}/>
          <img src={IndiaMart} style={{width:'150px'}}/>
        </Box>
      </Box>

      <Stripe image={parallax1}>
        <h1 style={{ marginBottom: "50px" }}>
          Red Sandlewood Products Are What We Know Best
        </h1>
        <StyledButton mode="dark">Click Here</StyledButton>
      </Stripe>
    </div>
  );
}
