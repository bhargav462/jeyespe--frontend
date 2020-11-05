import React,{useState} from 'react'
import ReactImageMagnify from 'react-image-magnify';
import Img1 from './placeholder.jpg'
import Img2 from './1.jpg'
import Img3 from './2.jpg'
export default function ProductDetails({match}) {
    let arr=[Img1,Img2,Img3]
    const [shownImage,changeImage]=useState(0)
    const productId=match.params.id;
    return <div style={{display:'flex',margin:'30px'}}>
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
        <h1>Hello World</h1>
        <button onClick={()=>changeImage((shownImage+arr.length-1)%arr.length)}>Left</button>
        </div>
    
}
