import React,{useState,useEffect} from 'react'
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {StyledButton} from '../utility/StyledButton'
import {authentication} from '../utility/APISecurity'
import { MESSAGES } from '../utility/Messages';
import {MyLoader} from '../utility/MyLoader'
import swal from 'sweetalert';
import moment from 'moment';
import {MyBackDrop} from '../utility/MyBackDrop'


const useStyles = makeStyles((theme) => {
    return {
      container: {
            margin:'100px auto',
            width:'80%',
            minHeight:'100vh',
        },
        orderDetail:{
            padding:'20px',
            boxSizing:'border-box',
            marginTop:'10px'
        }
    }
})




export default function MyOrders(props){
    const [state,setState]=useState({orders:[],feedbacks:[],loading:true,activeBackDrop:false})
    const {orders,loading,activeBackDrop}=state;
    const classes=useStyles();

    useEffect(()=>{
        //To set scroll bar to top
        window.scrollTo(0, 0)
          
        const headers = {
            "Content-Type": "application/json",
            "token": Cookies.get('token')
        }

        fetch(process.env.REACT_APP_API_URL+"/myOrders",{
            method: "POST",
            headers
        })
        .then(response=> {
           authentication(response, (orders)=> {
               if(orders==MESSAGES.LOGIN_ERROR)
                {
                    setState(prevState=>{ 
                        return {...prevState,loading:false}
                    })
                    return
                }

            let displayList= [];
           
            orders.forEach(order => {
                console.log(order.items)
                let orderId=order._id;
                let createdAt=order.createdAt;
                order.items.forEach(orderUnits=> displayList.push({...orderUnits,_id:orderId,date:createdAt}))
            })
            let sorted=displayList.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
              });
            
            setState(prevState=>{
                return {orders:displayList,loading:false}
            })
        })
    }
    )},[])

    function reviewSubmission(e,orderId,itemId,feedbackInputId)
    {
        setState(prevState=>{
            return {...prevState,activeBackDrop:true,loading:false}
        })
        e.preventDefault();
        const review= document.getElementById(feedbackInputId).value;
    
        fetch(process.env.REACT_APP_API_URL + "/orders/addFeedback",{
            method: "POST",
            headers:{
                    "Content-Type": "Application/json",
                    token: Cookies.get("token")
            },
            body:JSON.stringify({id:orderId,itemId,feedback:review})
        }
        ).then(response=> authentication(response,data=>{
            swal('Review Recieved').then(
                setState(prevState=>{
                    return {...prevState,loading:false,activeBackDrop:false}
                })
            )
        
        }))
        .catch(err=> swal('something went wrong').then(setState(prevState=>{
            return {...prevState,loading:false,activeBackDrop:false}
        })))

    }

        if(loading) return <MyLoader/>
        else if(orders.length==0)  
             return <h1 className={classes.container}>You Haven't placed any order</h1>
        else
            return (<div className={classes.container}>
                <MyBackDrop open={activeBackDrop}/>

            {
                orders.map((order,idx)=>{
                   return <>

                    <Paper key={order._id} className={classes.orderDetail}>
                        <p><strong>Order ID</strong>: {order._id}</p>
                        <p><strong>Quantity</strong>: {order.quantity}</p>
                        <p><strong>Total</strong>: Rs. {order.price*order.quantity}</p>
                        <p><strong>Placed At </strong>: {moment(order.date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                      
                        <p>{order.name}</p>
                        <img src={`${process.env.REACT_APP_API_URL}/images/${order.img}`}
                            width={'100px'}></img>      
                    </Paper>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography>Write a Review</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                         
                            <form onSubmit={(e)=>reviewSubmission(e,order._id,order.itemId,'feedback'+idx)} style={{width:'100%'}}>
                                <textarea id={'feedback'+idx} style={{width:'80%'}} >
                                    {
                                        order.feedback
                                    }
                                </textarea>
                                <br/>
                                <StyledButton type="submit">Submit</StyledButton>
                            </form>
                        </AccordionDetails>
                   </Accordion>
                </>
                })
            }
        </div>)
}
