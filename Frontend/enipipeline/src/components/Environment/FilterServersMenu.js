import { Button, Grid, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";


const FilterServersMenu = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    let serverTypes = [];
  
    for (let i = 0; i < props.availableTypes.length; i++) {
      serverTypes.push(
        <MenuItem onClick={() => { setAnchorEl(null); props.selectType(props.availableTypes[i]) }}>{props.availableTypes[i]}</MenuItem>
      );
    }
  
    return (
      <Grid>
        <Button variant="h6" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Filter Servers</Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => { setAnchorEl(null) }}
        >
          {serverTypes}
        </Menu>
      </Grid>
    );
  }

  export default FilterServersMenu;