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
import "./ProductStyle.css"

function addToCart(productId,itemFamily,name,price) {
    console.log('cart');
    const headers = {
      "Content-Type": "Application/json",
      token: Cookies.get("token"),
    };

    // TODO : create the item object
    let item = {
      itemId:productId,
      itemFamily:itemFamily,
      quantity:1,
      name,
      price
    }
    console.log('item bro',item)
    fetch(process.env.REACT_APP_API_URL + "/addToCart",{
      method: "POST",
      headers,
      body:JSON.stringify(item)
    }).then(data => {
      if(!data.ok)
      {
        alert('please login')
      }else{

      return data.json();
      }
    }).then((response) => {
      if(response && response.itemPresent){
        //TODO: Item is already present in the cart
        alert('Item is already present in the cart');
      }
      else{
      console.log(response);
      alert('item added')}
    })
  }

export default function ProductDetails(props) {
    const {match}=props
    const {params: {id,family}}=match
    const [images,setImages]=useState([])
    const [shownImage,changeImage]=useState(0)
    const [productDetails,setDetails]=useState({name:'product_name',price:0,description:[]})
    const matches = useMediaQuery(theme => theme.breakpoints.up('md'));

    React.useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL + `/images1/getChildImages/${family}/${id}`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "token": Cookies.get('token'),
            }
          }).then(res=> res.json())
          .then(body=> {
              console.log('body-------',body)
              const {imgChildren}=body
              setImages(imgChildren)
              setDetails({name:body.name,price:body.price,description:body.description})
          })
    },[])
    
    
    return <>
    {matches ?   <div style={{display:'flex',margin:'8% 30px',minHeight:'100vh'}}>
    
        <div>hello</div>
           
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
        <div style={{width:'600px',height:'600px',backgroundColor:'red'}}>
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
                    <StyledButton style={{marginRight:'30px'}}>Buy Now</StyledButton>
                    <StyledButton>Add to Cart</StyledButton>
                </div>
         </div>
        </div>
        :
        <div style={{marginTop:'90px',marginLeft:'40px'}}>
            <img src={`${process.env.REACT_APP_API_URL}/images/${images[shownImage]}`}/>
            <div style={{marginLeft:'40px',flexDirection:'column',flexGrow:1, display:'flex'
                        , padding:'30px'}}>
            <h1>Product Name</h1>
            <h2>Price $2342</h2>
                <div style={{marginTop:'20px'}}>
                    <StyledButton style={{marginRight:'30px'}}>Buy Now</StyledButton>
                    <StyledButton>Add to Cart</StyledButton>
                </div>
         </div>
        </div>
    }
        
    </>
    
}
