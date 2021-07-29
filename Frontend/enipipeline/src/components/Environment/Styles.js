import { makeStyles, withStyles, TableRow } from "@material-ui/core";


const drawerWidth = 240;


// Styling for the environment page elements
const environmentStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },

  title: {
    flexGrow: 1,
  },

  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: 'linear-gradient(150deg, #98c1d9 80%, #e0fbfc 90%)'
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  table: {

    minWidth: 2,
    minHeight: 38,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    background: '#468faf',
  },

  drawerPaper: {
    width: drawerWidth,
    background: 'linear-gradient(45deg, #ced4da 50%, #dee2e6 90%)',
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
  divider: {
    background: 'linear-gradient(45deg, #ced4da 50%, #dee2e6 90%)',
  },

  listItemText: {
    fontSize: 120,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

// Styling for the top row of server table
const StyledTableRow = withStyles((theme) => ({
  head: {
    background: '#dee2e6',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 140,
  },

}))(TableRow);

export { StyledTableRow, environmentStyles };