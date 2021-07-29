import { Button, Grid, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";


const SoftwareTypeMenu = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    let allSoftware = [];

    for (let i = 0; i < props.allSoftware.length; i++) {
        allSoftware.push(
            <MenuItem onClick={() => { setAnchorEl(null); props.selectSoftware(props.allSoftware[i]); }}>{props.allSoftware[i].name}  {props.allSoftware[i].version}</MenuItem>
        );
    }

    return (

        <Grid>
            <Button variant="h6" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Select Software</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null) }}
            >
                {allSoftware}
            </Menu>
        </Grid>

    );
}

export default SoftwareTypeMenu;