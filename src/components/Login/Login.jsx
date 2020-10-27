import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';


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
          marginTop:'15%',
          padding: '50px 30px 30px 30px',         
        },
        [theme.breakpoints.down('sm')]:{
          marginTop:'30%',
          padding: '40px 10px 30px 10px',         
        },
    } ,
    submitButton:{
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        "&:hover":{
            backgroundColor: theme.palette.secondary.light,
            // color:theme.palette.secondary.main
          }
    }
}));

export default function Log() {
    const classes=useStyles()

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
        console.log(values);
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
              <Button
                variant="contained"
                disabled={isSubmitting}
                onClick={submitForm}
                className={classes.submitButton}
              >
                Login
              </Button>
            </Grid>
            </Paper>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

//    function Login() {
//     const classes = useStyles();

//     return (
//       <FormControl className={classes.form}>
//         {/* <Grid container direction="column" spacing={3} alignItems="center"> */}
//             <TextField className={classes.inputElement} label="User Name" variant="outlined" type="email"/>
//             <TextField className={classes.inputElement} label="Password" variant="outlined" type="password"/>
//             <Button variant="contained" color="primary" type="submit">Submit</Button>
//         {/* </Grid> */}
//       </FormControl>
//     );
//   }
