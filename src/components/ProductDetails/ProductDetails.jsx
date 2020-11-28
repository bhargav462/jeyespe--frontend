import React,{useState} from 'react'
import ReactImageMagnify from 'react-image-magnify';
import Img1 from './placeholder.jpg'
import Img2 from './1.jpg'
import Img3 from './2.jpg'
import Cookies from "js-cookie";
import Button from '@material-ui/core/Button';
import {StyledButton} from '../utility/StyledButton'
import ImageGallery from 'react-image-gallery';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {StripePayment} from '../utility/StripePayment';
import {addToCart} from '../utility/AddToCart'
import Carousel from 'react-bootstrap/Carousel'
import { makeStyles } from "@material-ui/core/styles";
import {authentication} from '../utility/APISecurity'
import { MESSAGES } from '../utility/Messages';
import { MyLoader } from '../utility/MyLoader';
import { Typography } from "@material-ui/core";
import {AuthContext} from '../utility/AuthProvider'

const useStyles = makeStyles((theme) => ({
   img:{
       width:'100px',
       height:'100px'
   },
   responsiveHeading:{
       fontSize:'25px'
   }
}))

export default function ProductDetails(props) {
    const {match}=props
     const {params: {id,family}}=match
     const user = React.useContext(AuthContext);
     const [state,setState]=useState({images:[],shownImage:0,
                productDetails:{name:'product_name',price:0,description:[]},loading:true})

    let {images,shownImage,productDetails,loading}=state;

    const classes=useStyles()
    const matches = useMediaQuery(theme => theme.breakpoints.up('md'));

    React.useEffect(()=>{
        setState(prevState=>{
            return {...prevState,loading:true}
        })
        fetch(process.env.REACT_APP_API_URL + `/images1/getChildImages/${family}/${id}`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "token": Cookies.get('token'),
            }
          }).then(res=> {
              authentication(res,body=> {
                  if(body==MESSAGES.LOGIN_ERROR)
                   {
                        setState(prevState=>{
                            return {...prevState,loading:false}
                        })
                        return
                   }
                   else{
                    const {imgChildren}=body
                    setState(prevState=>{
                        return {...prevState,loading:false,images:imgChildren,
                        productDetails: {name:body.name,price:body.price,description:body.description
                            ,id:id,family:family} }
                    })
                }
          })
        })
    },[])
    
    function changeImage(idx){
            setState(prevState=>{
                return {...prevState,shownImage:idx,loading:false}
            })
    }

    if(loading)
    {
        return <MyLoader/>
    }
    
    return <>
    {matches ?   <div style={{display:'flex',margin:'8% 30px',minHeight:'100vh'}}>

            <div style={{display:'flex',flexDirection:'column',marginRight:'10px'}}>
            {
                images.map((img,idx)=>{
                    return <div style={{width:'60px',height:'70px',
                    backgroundImage:`url(${process.env.REACT_APP_API_URL}/images/${img})`,
                        backgroundSize:'cover',marginBottom:'5px',
                    backgroundRepeat:'no-repeat'}}
                            onClick={()=> changeImage(idx)}>    
                        </div>
                })
            }

            
             
        </div>
        <div style={{width:'500px',height:'500px',backgroundColor:'#e9e4d0'}}>
           <ReactImageMagnify {...  {
            smallImage: {
                isFluidWidth: true,
                src:`${process.env.REACT_APP_API_URL}/images/${images[shownImage]}`,    
            },
            largeImage: {
                src:`${process.env.REACT_APP_API_URL}/images/${images[shownImage]}`,
                width: 1000,
                height: 1000
            },
            enlargedImageContainerStyle: {
                zIndex: "1500",
              },
            shouldUsePositiveSpaceLens: true,
            isHintEnabled:true,
            shouldHideHintAfterFirstActivation: false,
            // enlargedImagePosition:'over'
        }} />
        </div>
        <div style={{marginLeft:'40px',flexDirection:'column', display:'flex'
                        , padding:'30px'}}>
            <h1>{productDetails.name}</h1>
            <h2>Price ${productDetails.price}</h2>
            <div style={{maxWidth:'700px'}}>

            {
                productDetails.description.map(desc=> <p>{desc}</p>)
            }
            </div>
            
               
                <div style={{marginTop:'20px'}}>

                    {user &&    <StripePayment isCart={false} productDetails={productDetails}/> }
                    
                    <StyledButton onClick={()=> addToCart(productDetails.id,productDetails.family,productDetails.name,productDetails.price)}>Add to Cart</StyledButton>
                </div>
                   
         </div>
        </div>
       
        : 
        <div style={{marginTop:'90px'}}>
            <Carousel controls={false} interval={10000000} style={{textAlign:'center'}}>
            {
                images.map((image,idx)=>{
                    return (<Carousel.Item >
                    <img style={{width:'350px',height:'350px'}} src={`${process.env.REACT_APP_API_URL}/images/${image}`}></img>
                    </Carousel.Item>)
                })

            }

            </Carousel>
            <div style={{marginLeft:'20px',flexDirection:'column',flexGrow:1, display:'flex'
                        , padding:'30px'}}>
           <div className={classes.responsiveHeading} variant="h3">{productDetails.name}</div>
            <div className={classes.responsiveHeading}>Price ${productDetails.price}</div>
                <div style={{marginTop:'20px'}}>
                    
                {user &&  <StripePayment isCart={false} productDetails={productDetails} size={'small'} /> }
                    
                    <StyledButton size={'small'} onClick={()=> addToCart(productDetails.id,productDetails.family,productDetails.name,productDetails.price)}>Add to Cart</StyledButton>
                </div>
         </div>
        </div>
    }
        
    </>
    
}
