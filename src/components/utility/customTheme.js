import { createMuiTheme } from "@material-ui/core/styles";

const innerTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#b18857",
      dark: "#504037",
      light: "#e9e4d0",
    },
    secondary: {
      main: "#5c6bc0",
      light: "#ffc08d",
      dark: "#c56033",
    },
  },
  typography: {
    fontSize: 16,
    // fontFamily: [
    //   "Comic Sans MS", 'cursive', 'sans-serif'
    // ].join(','),
  },
});
innerTheme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [innerTheme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

innerTheme.typography.h5 = {
  fontSize: "0.7rem",
  "@media (min-width:600px)": {
    fontSize: "0.8rem",
  },
  [innerTheme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
};

export default innerTheme;
