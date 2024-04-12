import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Search, DoneAll } from '@mui/icons-material';

const navItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DoneAll />
            </ListItemIcon>
            <ListItemText primary="Subscriptions" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <Search />
            </ListItemIcon>
            <ListItemText primary="Query" />
        </ListItemButton >
    </React.Fragment>
);

export default navItems