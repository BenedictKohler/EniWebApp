import { makeStyles, TableRow, withStyles } from "@material-ui/core";

const drawerWidth = 240;

// Styling for all elements on home page
const homeScreenStyles = makeStyles((theme) => ({
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

// Styling for Environment Table
const StyledTableRow = withStyles((theme) => ({
    head: {
      background: '#dee2e6',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 140,
    },
  
  }))(TableRow);

export { homeScreenStyles, StyledTableRow };