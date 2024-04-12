'use client'

import React, { useState } from 'react';
import { Box, styled, CssBaseline, Drawer as MuiDrawer, AppBar as MuiAppBar, AppBarProps as MuiAppBarProps, Toolbar, List, Typography, Divider, IconButton, Button, Grid, TextField, useTheme, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Search, DoneAll, ChevronLeft, Menu } from '@mui/icons-material'
import { SubscriptionCard, QueryCard } from './components/card';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Dashboard() {
  const theme = useTheme()
  const [open, setOpen] = useState(true);
  const [selectedView, setSelectedView] = useState("query")

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  const handleNavChange = (view: string) => {
    setSelectedView(view)
  }

  const getNavStyles = (itemName: string): React.CSSProperties => ({
    backgroundColor: selectedView === itemName ? theme.palette.primary.main : "inherit",
    color: selectedView === itemName ? "white" : "inherit",
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Welcome, Lester Correya
          </Typography>
          <Button variant="contained" color='error'>Log Out</Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton style={getNavStyles("subscriptions")} onClick={() => handleNavChange("subscriptions")}>
            <ListItemIcon style={{ color: "inherit" }}>
              <DoneAll />
            </ListItemIcon>
            <ListItemText primary="Subscriptions" />
          </ListItemButton>
          <ListItemButton style={getNavStyles("query")} onClick={() => handleNavChange("query")}>
            <ListItemIcon style={{ color: "inherit" }}>
              <Search />
            </ListItemIcon>
            <ListItemText primary="Query" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        {selectedView === "subscriptions" && <Grid container spacing={4} padding={4}>
          <Grid item xs={3}>
            <SubscriptionCard />
          </Grid>
          <Grid item xs={3}>
            <SubscriptionCard />
          </Grid>
        </Grid >}
        {selectedView === "query" &&
          <Grid container spacing={4} padding={4}>
            <Grid item xs={3}>
              <Box component="form" noValidate onSubmit={handleSearch}>
                <TextField
                  required
                  fullWidth
                  label="Search Music"
                  name="music"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Search
                </Button>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <QueryCard />
            </Grid>
            <Grid item xs={3}>
              <QueryCard />
            </Grid>
          </Grid >
        }
      </Box>
    </Box>
  );
}