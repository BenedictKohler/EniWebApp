import { Button, Container, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";


const TeamMenu = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    let teams = [];

    for (let i = 0; i < props.teams.length; i++) {
        teams.push(
            <MenuItem onClick={() => { setAnchorEl(null); props.updateTeam(props.teams[i]) }}>{props.teams[i].teamName}</MenuItem>
        );
    }

    return (
        <Container>
            <Button fullWidth variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{props.teamName}</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null) }}
            >
                {teams}
            </Menu>
        </Container>
    );
}

export default TeamMenu;