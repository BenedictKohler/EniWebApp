
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


}));



export { sideBarStyles };