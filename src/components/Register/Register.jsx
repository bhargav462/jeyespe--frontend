import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import {StyledButton} from '../utility/StyledButton'

const useStyles = makeStyles((theme) => ({
  textInput:{
    [theme.breakpoints.down('sm')]:{
        width:'300px'
    },
    [theme.breakpoints.up('sm')]:{
        width:'500px'
    },
    marginBottom:'10px',
} ,
formContainer:{
    marginTop:'5%',
    padding: '50px 30px 30px 30px',
    textAlign:'center',
    [theme.breakpoints.down('md')]:{
      marginTop:'8%',
      padding: '50px 30px 30px 30px',         
    },
    [theme.breakpoints.down('sm')]:{
      marginTop:'10%',
      padding: '40px 10px 30px 10px',         
    },
} 
}));

export default function Logout() {
    const classes=useStyles()
    let history = useHistory();

    return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        username:"",
        contact: ""
      }}
      validate={(values) => {
        console.log(values);
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
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log('values',values);

        fetch('https://jeyespe-backend.herokuapp.com/register',{
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
          }).catch(function(e){
            console.log(e.message);
            if(e.message === 'email'){
              console.log('email already used')
            }else if(e.message === 'phoneNo'){
              console.log('phone number already in use')
            }
          })
          return 'error';
        })
        .then(data => {
            if(data !== 'error'){
              alert('registered successfully');
              history.push('/login')

            }
        })

        setTimeout(() => {
          setSubmitting(false);
          alert("we recieved");
          // alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ isSubmitting, submitForm }) => (
        <Form >
          <Grid container direction="column" alignItems="center">
          <Paper elevation={10} className={classes.formContainer}>
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
  );
}

