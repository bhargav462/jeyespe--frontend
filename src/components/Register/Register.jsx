import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import { StyledButton } from "../utility/StyledButton";
import swal from "sweetalert";
import { MyBackDrop } from "../utility/MyBackDrop";
import * as yup from "yup";
import { useFormik } from "formik";
import "yup-phone";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import StyledLink from "../utility/StyledLink";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "black",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.dark,
      textDecoration: "none",
    },
  },
  activeLink: {
    color: theme.palette.primary.dark,
  },
  textInput: {
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "500px",
    },
    marginBottom: "10px",
  },
  errorMessage: {
    color: "red",
    textAlign: "left",
    marginBottom: "10px",
  },
  formContainer: {
    marginTop: "7%",
    padding: "50px 30px 30px 30px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      padding: "50px 30px 30px 30px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "20%",
      padding: "40px 20px 30px 20px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "30%",
      padding: "40px 20px 30px 20px",
    },
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  username: yup.string("Enter your username").required("username is required"),
  contact: yup.string().phone().required(),
  privacyPolicy: yup
    .bool("Field must be checked")
    .oneOf([true], "Field must be checked"),
});

export default function Logout() {
  const classes = useStyles();
  let history = useHistory();
  const [contactErrorMessage, setContactMessage] = React.useState("");
  const [emailErrorMessage, setEmailMessage] = React.useState("");
  const [country, setCountry] = useState({ currency: "INR", name: "INDIA" });
  const [activeBackDrop, setActiveBackDrop] = useState(false);

  function validateContact(value) {
    return contactErrorMessage;
  }

  const handleCountryChange = (event) => {
    console.log(event.target.value);
    setCountry({
      name: event.nativeEvent.target.textContent,
      currency: event.target.value,
    });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      contact: "",
      privacyPolicy: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      values = { ...values, country };
      setContactMessage("");
      setEmailMessage("");
      setActiveBackDrop(true);
      fetch(process.env.REACT_APP_API_URL + "/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            return res.json();
          }

          res
            .json()
            .then(function (text) {
              if (text.error) {
                throw new Error(text.error);
              } else console.log(text);
            })
            .catch(function (e) {
              console.log(e.message);
              if (e.message === "email") {
                setEmailMessage("email already in use");

                // TODO: "Email already used"
              } else if (e.message === "phoneNo") {
                setContactMessage("Phone Number already in use  ");
                // TODO: "Phone Number already in use"
              }
            });
          return "error";
        })
        .then((data) => {
          if (data !== "error") {
            swal("registered successfully").then(() => history.push("/login"));
          }
        })
        .finally(() => setActiveBackDrop(false));

      setTimeout(() => {
        setSubmitting(false);
      }, 500);
    },
  });

  return (
    <>
      <MyBackDrop open={activeBackDrop} />

      <form onSubmit={formik.handleSubmit}>
        <Grid container direction="column" alignItems="center">
          <Paper elevation={10} className={classes.formContainer}>
            <Grid item></Grid>
            <Grid item>
              <TextField
                type="username"
                label="Username"
                name="username"
                variant="outlined"
                value={formik.values.username}
                className={classes.textInput}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>

            <Grid item>
              <TextField
                name="email"
                variant="outlined"
                label="Email"
                className={classes.textInput}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <div className={classes.errorMessage}>{emailErrorMessage}</div>
            </Grid>

            <Grid item>
              <TextField
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                className={classes.textInput}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid item>
              <TextField
                type="contact"
                label="Contact"
                name="contact"
                variant="outlined"
                className={classes.textInput}
                onChange={formik.handleChange}
                value={formik.values.contact}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />

              <div className={classes.errorMessage}>{contactErrorMessage}</div>
            </Grid>

            <Grid item>
              <FormControl
                error={
                  formik.touched.privacyPolicy &&
                  Boolean(formik.errors.privacyPolicy)
                }
              >
                <FormControlLabel
                  className={classes.textInput}
                  control={
                    <Checkbox
                      checked={formik.values.privacyPolicy}
                      onChange={formik.handleChange}
                      name="privacyPolicy"
                      color="primary"
                      error={
                        formik.touched.privacyPolicy &&
                        Boolean(formik.errors.privacyPolicy)
                      }
                      helperText={
                        formik.touched.privacyPolicy &&
                        formik.errors.privacyPolicy
                      }
                    />
                  }
                  label={
                    <>
                      Accept
                      <StyledLink to="/termsAndConditions">
                      {" "}Terms and Conditions{" "}
                      </StyledLink>
                      &{" "}
                      <StyledLink to="/privacyPolicy">
                        Privacy Policy
                      </StyledLink>
                    </>
                  }
                />
                <FormHelperText>
                  {formik.touched.privacyPolicy && formik.errors.privacyPolicy}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item>
              <StyledButton variant="contained" type="submit" mode="light">
                Register
              </StyledButton>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </>
  );
}
