import React,{useState,useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { MyLoader } from '../utility/MyLoader'
import Cookies, { set } from "js-cookie";
import { authentication } from '../utility/APISecurity'
import Paper from "@material-ui/core/Paper";
import moment from 'moment'
const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    minHeight: "60vh",
    margin: "80px auto",
  },
  orderDetail: {
    padding: "20px",
    boxSizing: "border-box",
    marginTop: "10px",
  },
}));
export default function TrackOrder(props) {
    const orderId = props.match.params?.orderId;
   
    const classes = useStyles();
    const [state, setState] = useState({ loading: true, curStatus: [], shipmentStatus: {} })
    const { loading,shipmentStatus,curStatus } = state;
    useEffect(() => {
        window.scrollTo(0, 0);

    const headers = {
      "Content-Type": "application/json",
      token: Cookies.get("token"),
    };

        fetch(process.env.REACT_APP_API_URL + "/package/track", {
            method: "POST",
            headers,
            body: JSON.stringify({ orderId })

        }).then((response) => {
            authentication(response, (status) => {
                // console.log('hello world')
                console.log(status)
                const scans = status.ShipmentData[0].Shipment.Scans;
                let temp=[]
                scans.reverse().forEach(({ScanDetail}) => {
                    temp.push({
                      location: ScanDetail.ScannedLocation,
                      instructions: ScanDetail.Instructions,
                      timeStamp:ScanDetail.ScanDateTime,
                    });
                });
                // console.log(scans)
                setState(prevState => {
                    return {curStatus:temp, shipmentStatus:status.ShipmentData[0].Shipment.Status}
                })
            })
        }).finally(() => {
            setState(prevState => {
                return {...prevState,loading:false}
            })
        })
    },[])
 if (loading) {
   return <MyLoader />;
 }
    
    return (
      <div className={classes.container}>
            <h1 style={{ textAlign: 'center' }}>{shipmentStatus?.Status}</h1>
            <h3>Status: {shipmentStatus?.Instructions}</h3>
        {curStatus.map((status) => {
          return (
            <Paper key={status.timeStamp} className={classes.orderDetail}>
              <p>Location : {status.location}</p>
              <p> Status : {status.instructions}</p>
              <p> Time: {moment(status.timeStamp).format("DD-MM-YYYY HH:MM:SS")}</p>
            </Paper>
          );
        })}
      </div>
    );
}