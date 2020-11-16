import React,{useState,useEffect} from 'react'
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    const [orders,setOrders]=useState([]);
    const classes=useStyles();

    useEffect(()=>{
        const headers = {
            "Content-Type": "application/json",
            "token": Cookies.get('token')
        }
        fetch(process.env.REACT_APP_API_URL+"/myOrders",{
            method: "POST",
            headers
        }).then(response=> response.json())
        .then(orders=> {
            // console.log(orders)
            let displayList= [];
            orders.forEach(order => {
                console.log(order.items)
                order.items.forEach(orderUnits=> displayList.push(orderUnits))
            })
            console.info(displayList)
            setOrders(displayList)
        })
    },[])

        return (<div className={classes.container}>
            {
                orders.map(order=>{
                   return <>

                    <Paper key={order._id} className={classes.orderDetail}>
                        <p><strong>Order ID</strong>: {order._id}</p>
                        <p><strong>Total</strong>: Rs. {order.price*order.quantity}</p>
                        <p>{order.name}</p>
                        <img src={`${process.env.REACT_APP_API_URL}/images/${order.img}`}
                            width={'100px'}></img>      
                    </Paper>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography>Write a Review</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <form>
                                <input></input>
                                <button>Submit</button>
                            </form>
                        </AccordionDetails>
                   </Accordion>
                </>
                })
            }
        </div>)
}
