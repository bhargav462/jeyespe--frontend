import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router'
import {AuthContext,AuthUpdateContext} from '../utility/AuthProvider'
import { useHistory } from "react-router-dom";
import {StyledButton} from '../utility/StyledButton'
import Cookies from 'js-cookie'

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
        marginTop:'12%',
        padding: '50px 30px 30px 30px',
        textAlign:'center',
        [theme.breakpoints.down('md')]:{
          padding: '50px 30px 30px 30px',         
        },
        [theme.breakpoints.down('sm')]:{
          marginTop:'20%',
          padding: '40px 20px 30px 20px',         
        },
    } 
}));


export default function Log(props) {
    const classes=useStyles()
    const user=React.useContext(AuthContext)
    const setUser=React.useContext(AuthUpdateContext)
    let history = useHistory();

    console.log('this is fucked up',user)
    if(user) return <Redirect to="/"/>
    return (
    <Formik
      initialValues={{
        email: "",
        password: "",
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
        return errors;
      }}

      onSubmit={(values, { setSubmitting }) => {
        console.log('values',values);

        setTimeout(() => {
          
        fetch(process.env.REACT_APP_API_URL+'/login',{
          method:'POST',
          headers:{
            "content-Type": "application/json"
          },
          body: JSON.stringify(values)
        }).then(res => {
          
          if(res.ok)
          {
            return res.text();
          }else{
            alert('invalid credentials')
            console.log("invalid credentials")
            setSubmitting(false);
            return 'error';
            // do something
          }
        })
        .then(data => {

          console.log('res',data);
          
          Cookies.set('token', data, { expires: 7 })

          console.log('cookie',document.cookie);

          if(data !=='error')
          {
          // alert('Logged in successfully')
          console.log('data',data);
          localStorage.setItem('user', data)
           setUser(data)
           history.push('/catalog')
          }else{
            // TODO: "Show Invalid credentials message"
          }
          setSubmitting(false);
        })

          
          // alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {
         ({ isSubmitting, submitForm }) => (
        <Form >
          <Grid container direction="column" alignItems="center">
          <Paper elevation={10} className={classes.formContainer}>
          
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
            <Grid item>
              <StyledButton
                variant="contained"
                disabled={isSubmitting}
                onClick={submitForm}
                mode="light"
              >
                Login
              </StyledButton>
            </Grid>
            
            <Grid item>
              <a style={{color:'black'}} href={process.env.REACT_APP_API_URL+'/check'}>
                Forgot Password?
             </a>
            
            </Grid>
            </Paper>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
