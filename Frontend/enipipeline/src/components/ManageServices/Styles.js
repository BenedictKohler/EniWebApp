import { makeStyles, TableRow, withStyles } from "@material-ui/core";


const drawerWidth = 240;

//Styling for all the elements
const manageServicesStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: 'linear-gradient(150deg, #98c1d9 80%, #e0fbfc 90%)'
  },

  button: {
    background: 'linear-gradient(45deg, #98c1d9 280%, #e0fbfc 90%)'
  },

  table: {

    minWidth: 2,
    minHeight: 38,
  },

  divider: {
    // Theme Color, or use css color in quote
    background: 'linear-gradient(45deg, #ced4da 50%, #dee2e6 90%)',
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

//Styling for the top row
const StyledTableRow = withStyles((theme) => ({
  head: {
    background: '#dee2e6',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 140,
  },

}))(TableRow);

export { manageServicesStyles, StyledTableRow };