
import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

//Styling for all the elements
const sideBarStyles = makeStyles((theme) => ({

    toolbar: theme.mixins.toolbar,

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        background: '#468faf',
    },

    drawerPaper: {
        width: drawerWidth,
        background: 'linear-gradient(45deg, #ced4da 50%, #dee2e6 90%)',
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



export { sideBarStyles };