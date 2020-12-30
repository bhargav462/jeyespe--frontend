import React, { useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { brown } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Cookies from 'js-cookie'
import { authentication } from '../utility/APISecurity';
import { MyLoader } from '../utility/MyLoader';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import countries from '../utility/countries';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import {MESSAGES} from '../utility/Messages'
import {MyBackDrop} from '../utility/MyBackDrop'

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
            borderRadius:'12px',
            padding:'15px',
            width:'100%',
            fontSize:'15px'
        },
        heading:{
            marginBottom:'5px',
            marginTop:'15px',
            fontWeight:'bold'
        },
        formControl:{
            marginTop:'10px',
            // minWidth:'100%',
        },
        countrySelect:{
            border:'1px solid black', 
            borderRadius:'12px'
        },
        countrySubmitBtn:{
            backgroundColor: theme.palette.warning.dark,
            '&:hover': {
                background: theme.palette.warning.light,
             },
             marginTop:'20px',
             width:'100%',
             color:'white'
        }
    }
})


export default function Profile(){
    const classes=useStyles();
    const [state,setState]=React.useState(
        {
            loading:true,
            activeBackDrop:false,
            user:[
                     {'Full Name':''},
                    {'Email': ''},  
                    {'Contact:':''}, 
                ],
            country:{name:'',currency:''}
        })
    
    const {loading,activeBackDrop,user,country}=state

    useEffect(()=>{
        //To set scroll bar to top on navigation change
        window.scrollTo(0, 0)
          
        fetch(process.env.REACT_APP_API_URL+'/user/details',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "token": Cookies.get('token')
            }
            // send the body by using JSON.stringify
        }).then( (response) => {
          
            authentication(response,(data)=>{
                if(data==MESSAGES.LOGIN_ERROR){
                    setState(prevState=>{
                        return {...prevState,loading:false}
                    })
                    return
                }
                setState(prevState=>{
                    return {
                        loading:false,
                        activeBackDrop:false,
                        user:[
                            {'Full Name':data.name},
                            {'Email': data.email},
                            {'Contact':data.contact},
                        ],
                        country: data.country
                    }
                })
                console.log(state);
            })
        })
         
    },[])
    
    const handleCountryChange = (event) => {
        console.log(event.target.value)
        setState(prevState=>{
            return {...prevState, 
                country:{
                    name:event.nativeEvent.target.textContent,
                     currency:event.target.value
                }
            }
        })
      };
      const submitCountry=(event)=>{
          event.preventDefault()
        
          setState(prevState=>{
              return {...prevState,loading:false,activeBackDrop:true}
          })

          fetch(process.env.REACT_APP_API_URL+'/updateCurrency',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "token": Cookies.get('token'),
                
            },
            body: JSON.stringify({countryName:country.name,countryCurrency:country.currency})
            // send the body by using JSON.stringify
        }).then( (response) => {
            setState(prevState=>{
                return {...prevState,loading:false,activeBackDrop:false}
            })
            if(response.ok)
                swal('Country Updated Successfully')
            else
                swal('Unable to update Country')
        }
        )

      }

    if(loading)
    {
        return <MyLoader></MyLoader>
    }

    return  <Box className={classes.container} elevation={3}
    m={{xs:1,sm:4,md:8}} component={Paper}>
        <h1 style={{textAlign:'center'}}>Profile</h1>
        <Divider/>

        <MyBackDrop open={activeBackDrop}/>

        {
            user.map(info=>{
                return <>
                          <div className={classes.heading}>{Object.keys(info)[0]}</div>    
                          <div className={classes.info}>{Object.values(info)[0]}</div>
                </>
            })
        }

        <FormControl component="form"
                     onSubmit={submitCountry} 
                     className={classes.formControl}
                     fullWidth={true}>
        <div className={classes.heading}>Country</div>
        <Select
          value={country.currency}
          variant='outlined'
          onChange={handleCountryChange}
          className={classes.countrySelect}
        >
            {
                countries.map(country=>{
                    return  <MenuItem value={country.currency}>
                        {country.name}
                    </MenuItem>
                })
            }
        </Select>
        <Button className={classes.countrySubmitBtn} type="submit">Update</Button>
      </FormControl>
       
        {/* <button>Update</button> */}
        </Box>
}