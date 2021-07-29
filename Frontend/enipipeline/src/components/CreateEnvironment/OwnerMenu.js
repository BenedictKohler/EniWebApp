import { Button, Container, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";


const OwnerMenu = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    let users = [];

    for (let i = 0; i < props.users.length; i++) {
        users.push(
            <MenuItem onClick={() => { setAnchorEl(null); props.updateOwner(props.users[i]) }}>{props.users[i].fullName}</MenuItem>
        );
    }

    return (
        <Container>
            <Button fullWidth variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{props.ownerName}</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null) }}
            >
                {users}
            </Menu>
        </Container>
    );
}

export default OwnerMenu;