import Page1 from "./corousel1.jpg";
import Page2 from "./corousel2.jpg";
import Page3 from './corousel3.jpg'
import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from "@material-ui/core/styles";
import './style.css'
import logo from './../logo.jpg'
import {StyledButton} from '../utility/StyledButton'
import { Link, NavLink } from "react-router-dom";


function ShopNowButton(props){
    return <Link to="/catalog"><StyledButton>Shop Now</StyledButton></Link>
}

function Page1JSX() {
  return (
    <>
      <p> </p>
       <div className={'heading'}>
          Red Sandal wood
      </div>
      <ShopNowButton/>
    </>
  );
}
function Page2JSX() {
  return (
    <>
      <p style={{fontSize:'20px'}}>Pure Red Sandalwood logs for</p>
       <div className={'heading'} >
          Exports
      </div>
      <ShopNowButton/>
    
    </>
  );
}
function Page3JSX() {
  return (
    <>
      <p style={{fontSize:'20px'}}>Pure Red Sandalwood logs for</p>
       <div  className={'heading'} >
          Products
      </div>
      <ShopNowButton/>
    
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
  containered:{
    display: 'block',
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    border: '1px solid #ddd',
    paddingTop:'5%',
    paddingBottom:'10%'
  },
  courouselPageText:{
      marginTop:'60px'
  }
}))
const startScale=1.4
const finalScale=1

const pageTemplate=(page,animationState,classes)=> {
  return <>
       <div className={classes.containered}>
            <div
          className="bg-image-wrapper"
          style={{ 'transform': `scale(${animationState})`,backgroundImage:`url(${page.imgURL})`}}
        />
        <div className="content">
        
        <Zoom in={animationState===finalScale?true:false} timeout={2000}> 
          <img src={logo} style={{width:'10%'}}></img>
        </Zoom>
        <Fade in={animationState==finalScale?true:false} timeout={3000}>
          <div className={classes.courouselPageText}>
            {
              page.content
            }
          </div>
        </Fade>
        </div>
      </div>
  </>
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
  {
    content:<Page3JSX/>,
    imgURL: Page3
  }
];


export default function CUstomCarousel(){
  const classes=useStyles()
  const startScale=1.4
  const finalScale=1
   let arr=new Array(pages.length)
   arr.fill(startScale)
   const [animationStates,changeAnimationState]=React.useState(arr)
    React.useEffect(()=>{
      let copyArr=[...animationStates]
      copyArr.fill(startScale)
      copyArr[0]=finalScale
      changeAnimationState(copyArr)      
    },[])
  return (
<Carousel 
  onSlid={(e)=>{
    let copyArr=[...arr]
    copyArr[e]=finalScale
    changeAnimationState(copyArr)
  }}
  >
   {
      pages.map((page,idx)=>{
        return <Carousel.Item interval={5000} key={page.imgURL}> 
        {pageTemplate(page,animationStates[idx],classes)} 
         </Carousel.Item>
      })
    }
</Carousel>
  )
}