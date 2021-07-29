import { makeStyles } from "@material-ui/core";


const drawerWidth = 240;

// Styling for all elements on create environment page
const createEnvironmentStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: 'linear-gradient(150deg, #98c1d9 80%, #e0fbfc 90%)'
  },

  table: {

    minWidth: 2,
    minHeight: 38,
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

  button: {
    background: 'linear-gradient(45deg, #98c1d9 280%, #e0fbfc 90%)'

  },
}));


export { createEnvironmentStyles };