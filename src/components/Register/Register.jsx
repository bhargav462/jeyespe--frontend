import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import {StyledButton} from '../utility/StyledButton'
import countries from '../utility/countries'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, NavLink } from "react-router-dom";
import swal from 'sweetalert'
import {MyBackDrop} from '../utility/MyBackDrop'

const useStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    marginTop:'10px',
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.dark,
      textDecoration: "none",
    },
  },
  activeLink:{
    color:theme.palette.primary.dark
  },
  textInput:{
    [theme.breakpoints.down('sm')]:{
        width:'300px'
    },
    [theme.breakpoints.up('sm')]:{
        width:'500px'
    },
    marginBottom:'10px',
} ,
errorMessage:{
  color:'red',
  textAlign:'left',
  marginBottom:'10px'
},
  formContainer:{
  marginTop:'7%',
  padding: '50px 30px 30px 30px',
  textAlign:'center',
  [theme.breakpoints.down('md')]:{
    padding: '50px 30px 30px 30px',         
  },
  [theme.breakpoints.down('sm')]:{
    marginTop:'20%',
    padding: '40px 20px 30px 20px',         
  },
  [theme.breakpoints.down('xs')]:{
    marginTop:'30%',
    padding: '40px 20px 30px 20px',         
  },
} 
}));




export default function Logout() {
    const classes=useStyles()
    let history = useHistory();
    const [contactErrorMessage,setContactMessage]=React.useState('');
    const [emailErrorMessage,setEmailMessage]=React.useState('');
    const [country,setCountry]=useState( {currency:'INR', name:'INDIA'});
    const [activeBackDrop,setActiveBackDrop]=useState(false)

    function validateContact(value) {

      return contactErrorMessage;

    }

    const handleCountryChange = (event) => {
      console.log(event.target.value)
      setCountry({
                  name:event.nativeEvent.target.textContent,
                   currency:event.target.value
              })
    };

    return <>
 
     <MyBackDrop open={activeBackDrop}/>

    <Formik
      initialValues={{
        email: "",
        password: "",
        username:"",
        contact: "",
        
      }}
      validate={(values) => {
        // console.log(values);
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 8) {
          errors.password = "Password should be atleast 8 characters";
        }
        if(!values.username){
            errors.username="Required"
        }
        if(!values.contact)
        {
            errors.contact="Required"
        }
        else if(values.contact.length!=10 || Object.is(Number(values.contact),NaN))  
        {
          errors.contact="Enter valid number"
        }
        
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        values={...values,country}
        setContactMessage('')
        setEmailMessage('')
        setActiveBackDrop(true)
        fetch(process.env.REACT_APP_API_URL+'/register',{
          method:'POST',
          headers:{
            "content-Type": "application/json"
          },
          body: JSON.stringify(values)
        }).then(res => {
          console.log(res);
          if(res.ok){
            return res.json();
          }
          
          res.json().then(function(text){
            if(text.error){
              throw new Error(text.error);
            }
            else  console.log(text)
          }).catch(function(e){
            console.log(e.message);
            if(e.message === 'email'){
              setEmailMessage('email already in use')
  
              // TODO: "Email already used"
            }else if(e.message === 'phoneNo'){
              setContactMessage('Phone Number already in use  ')
              // TODO: "Phone Number already in use"
            }
          })
          return 'error';
        })
        .then(data => { 
            if(data !== 'error'){
              swal('registered successfully').then(()=>
              history.push('/login')
              )
            }
        })
        .finally(()=> setActiveBackDrop(false))

        setTimeout(() => {
          setSubmitting(false);
        
        }, 500);
      }}
    >
      {({ isSubmitting, submitForm }) => (
        <Form >
          <Grid container direction="column" alignItems="center">
          <Paper elevation={10} className={classes.formContainer}>
           
            <Grid item>
            
            {/* <Field name="country" component={Select} style={{minWidth:'100%'}} variant="outlined"
                                 value={country.currency}     onChange={handleCountryChange}
                                 className={classes.textInput}>
            {
                countries.map(country=>{
                    return  <MenuItem value={country.currency}>
                        {country.name}
                    </MenuItem>
                })
            }
            </Field> */}


            </Grid>
          <Grid item >
              <Field
                component={TextField}
                type="username"
                label="Username"
                name="username"
                variant="outlined"
                className={classes.textInput}
              />
            </Grid>
          <Grid item >
              <Field
                component={TextField}
                name="email"
                variant="outlined"
                label="Email"
                className={classes.textInput}
              />
              <div className={classes.errorMessage}>{emailErrorMessage}</div>
            </Grid>
            <Grid item >
              <Field
                component={TextField}
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                className={classes.textInput}
              />
            </Grid>
            <Grid item >
              <Field
                component={TextField}
                type="contact"
                label="contact"
                name="contact"
                variant="outlined"
                className={classes.textInput}
              />
              <div className={classes.errorMessage}>{contactErrorMessage}</div>
            </Grid>
            <Grid item>
              <StyledButton
                variant="contained"
                disabled={isSubmitting}
                onClick={submitForm}
                mode="light"
              >
                Register
              </StyledButton>

            
            
            </Grid>

            </Paper>
          </Grid>
            
         

        </Form>
      )}
    </Formik>
  </>
}

