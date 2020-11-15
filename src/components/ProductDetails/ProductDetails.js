import React,{useState} from 'react'
import ReactImageMagnify from 'react-image-magnify';
import Img1 from './placeholder.jpg'
import Img2 from './1.jpg'
import Img3 from './2.jpg'
import {StyledButton} from '../utility/StyledButton'
import Button from '@material-ui/core/Button';
import StripeCheckout from 'react-stripe-checkout';
import Cookies from 'js-cookie'

export default function ProductDetails({match}) {
    let arr=[Img1,Img2,Img3]
    const [shownImage,changeImage]=useState(0)
    const productId=match.params.id;

    function authentication(response) {
        if (!response.ok) {
          if (response.status === 403) {
            response.json().then((element) => {
              if (element.error === "Login") {
                // TODO : Route to login page
                console.log("routing")
              }else{
                renderData(element);     
              }
            });
          }
        }
    };
    
    function renderData(products){
      // TODO: Do something with response 
    }

    const makePayment = (token,products) => {
        const body = {
            token,
            products
        }
        
        const headers = {
            "Content-Type": "application/json",
            "token": Cookies.get('token')
        }
    
        return fetch(process.env.REACT_APP_API_URL+"/buyNow",{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            authentication(response)
        })
        .catch(error => console.log(error));
        
    }

    return <div style={{display:'flex',margin:'8% 30px'}}>
        <div style={{display:'flex',flexDirection:'column',marginRight:'10px'}}>
            {
                arr.map((img,idx)=>{
                    return <div style={{width:'60px',height:'70px',backgroundImage:`url(${img})`,
                        backgroundSize:'contain',marginBottom:'5px'}}
                            onClick={()=> changeImage(idx)}>
                        </div>
                })
            }

            
             
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'400px',height:'400px',backgroundColor:'#e9e4d0'}}>
           <ReactImageMagnify {...{
            smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: arr[shownImage],
              
            },
            largeImage: {
                src: arr[shownImage],
                width: 1100,
                height: 1000
            },
            shouldUsePositiveSpaceLens: true,
            isHintEnabled:true,
        }} />
        </div>
        <div style={{marginLeft:'40px',flexDirection:'column',flexGrow:1, display:'flex'
                        , padding:'30px'}}>
            <h1>Product Name</h1>
            <h2>Price $2342</h2>
            <div style={{marginTop:'20px'}}>
                <StripeCheckout
                    stripeKey="pk_test_51HgaW6HISAjMedpx6Rx65qvbEpNdhHsyyayo021HcDwMsSHmk9Ei4FnZsEZ1bogeCeG9gPTSdu9FBxgarfA5hlKQ00EJ3URML8"
                    token={makePayment}
                    shippingAddress
                    >
                </StripeCheckout>
                <button>Add to Cart</button>
            </div>
        </div>
        </div>
    
}
