import Page1 from "./page1.png";
import Page2 from "./page2.png";
import React from "react";
import Slide from "@material-ui/core/Slide";
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from "@material-ui/core/styles";


function Page1JSX() {
  return (
    <>
      <h1>100% Pure, Precious & Auspicious</h1>
      <h1>Red Sandle Wood</h1>
      <h3>(Pterocarpus santalinus)</h3>
      <p>
        products of Car Decors, Home Decors, Phone accessories, Idols,
        Sculptures, Bowls and many more.
      </p>
    </>
  );
}
function Page2JSX() {
  return (
    <>
      <h1>Real Sandle Health Products</h1>
      <p>
        products of Car Decors, Home Decors, Phone accessories, Idols,
        Sculptures, Bowls and many more.
      </p>
    </>
  );
}


const useStyles = makeStyles((theme) => ({
  courouselBackground:{
    backgroundSize:'550px 500px',
    backgroundPosition:'right',
    [theme.breakpoints.down('md')]:{
      backgroundSize:'400px 400px',
      backgroundPosition:'center'
  },
  [theme.breakpoints.down('sm')]:{
    backgroundSize:'300px 300px',
    backgroundPosition:'center'
}
  
  },
  courouselPageText:{
      [theme.breakpoints.down('md')]:{
          display:'none'
      }
  }
}))

const pageTemplate=(page,animationState,classes)=> {
  return (<>
    <div className={classes.courouselBackground}  style={{ backgroundImage: `url(${page.imgURL})`, color:'white',
                height:'500px',backgroundColor:'#a2a2a2', backgroundRepeat:'no-repeat',
                 
                 }}>
    <div className={classes.courouselPageText}>
    <Slide
        direction="right"
        in={animationState}
        timeout={{
          appear: 500,
          enter: 3000,
          exit: 500
        }}
      >
      <div>
      <Fade in={animationState} timeout={4000}>
      <p style={{padding:'50px'}}>{page.content}</p>
      </Fade>
      </div>
    </Slide>
    </div>
    </div>
    </>
  );
}

const pages= [
  {
    content: <Page1JSX />,
    imgURL: Page1,
  },
  {
    content: <Page2JSX />,
    imgURL: Page2,
  },
];


export default function CUstomCarousel(){
  const classes=useStyles()
   let arr=new Array(pages.length)
   arr.fill(false)
   arr[0]=true
   const [animationStates,changeAnimationState]=React.useState(arr)
  return (
<Carousel 
  onSlid={(e)=>{
    let copyArr=[...arr]
    copyArr.fill(false)
    copyArr[e]=true
    changeAnimationState(copyArr)
  }}
  >
    {
      pages.map((page,idx)=>{
        return <Carousel.Item interval={5000}>
        {pageTemplate(page,animationStates[idx],classes)} 
         </Carousel.Item>
      })
    }
</Carousel>
  )
}