import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { brown } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => {
    return {
        container:{
            minHeight:'100vh',
            marginTop:'80px',
            padding:'20px'
        },
        avatar: {
            color: 'white',
            backgroundColor: brown[400],
            marginTop:'15px',
            marginBottom:'15px'    
        },
        info:{
            border:'1px solid black',
            padding:'5px',
            width:'100%',
            fontSize:'15px'
        },
        heading:{
            marginBottom:'5px',
            marginTop:'10px'
        }
    }
})

export default function Profile(){
    const classes=useStyles();
    const user=[
        {'Full Name':'James'},
        {'Email': 'james@gmail.com'},
        {'Contact:':'890192843'},
        {'Region':'India'}
    ]

    return  <Box className={classes.container} elevation={3}
    m={{xs:1,sm:2,md:4}} component={Paper}>
        <h1>Account</h1>
        <Avatar  className={classes.avatar}>
            OP    
        </Avatar>
        <Divider/>
        <br/>
        
        {
            user.map(info=>{
                return <>
                          <div className={classes.heading}>{Object.keys(info)[0]}</div>    
                          <div className={classes.info}>{Object.values(info)[0]}</div>
                </>
            })
        }
       
        </Box>
}