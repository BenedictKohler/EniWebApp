import { Button, Container, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";


const ServerTypeMenu = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    let serverTypes = [];
  
    for (let i = 0; i < props.serverTypes.length; i++) {
      serverTypes.push(
        <MenuItem onClick={() => { setAnchorEl(null); props.updateServerType(props.serverTypes[i]) }}>{props.serverTypes[i].serverType}</MenuItem>
      );
    }
  
    return (
      <Container>
        <Button fullWidth variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{props.serverType.type}</Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => { setAnchorEl(null) }}
        >
          {serverTypes}
        </Menu>
      </Container>
    );
  }

  export default ServerTypeMenu;