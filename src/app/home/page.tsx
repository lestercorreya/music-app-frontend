// Code adapted from material UI dashboard example template
// https://github.com/mui/material-ui/tree/v5.15.15/docs/data/material/getting-started/templates/dashboard

'use client'

import React, { useEffect, useState } from 'react';
import { Box, Alert, Snackbar, styled, CssBaseline, LinearProgress, Drawer as MuiDrawer, AppBar as MuiAppBar, AppBarProps as MuiAppBarProps, Toolbar, List, Typography, Divider, IconButton, Button, Grid, TextField, useTheme, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Search, DoneAll, ChevronLeft, Menu } from '@mui/icons-material'
import { SubscriptionCard, QueryCard } from './components/card';
import axios from 'axios'
import { useRouter } from 'next/navigation';

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
  const router = useRouter()
  const [open, setOpen] = useState(true);
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [selectedView, setSelectedView] = useState("query")
  const [subscribedDict, setSubscribedDict] = useState<Record<string, boolean>>({});

  interface Music {
    title: string;
    img_url: string;
    year: number;
    artist: string;
  }
  const [subscriptions, setSubscriptions] = useState<Music[]>([])
  const [music, setMusic] = useState<Music[]>([]);
  const [filteredMusic, setFilteredMusic] = useState<Music[]>([])
  const [user, setUser] = useState({ username: "", email: "" })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionStorage.getItem("token")) router.push("/")

    axios.post("https://cq2evmczs1.execute-api.ap-southeast-2.amazonaws.com/Prod/getUser", { token: sessionStorage.getItem("token") })
      .then((res) => {
        setUser(res.data.user)

        const fetchSubscriptions = axios.post("https://cq2evmczs1.execute-api.ap-southeast-2.amazonaws.com/Prod/getSubscriptionsForUser", { email: res.data.user.email });
        const fetchMusic = axios.get("https://cq2evmczs1.execute-api.ap-southeast-2.amazonaws.com/Prod/getMusic");

        Promise.all([fetchSubscriptions, fetchMusic])
          .then(([subscriptionResponse, musicResponse]) => {
            // Handle subscriptions response
            setSubscriptions(subscriptionResponse.data.subscriptions);
            subscriptionResponse.data.subscriptions.forEach((subscription: Record<string, string>) => {
              setSubscribedDict(prevState => ({
                ...prevState,
                [subscription.title]: true
              }));
            });

            // Handle music response
            setMusic(musicResponse.data.music);
            setFilteredMusic(musicResponse.data.music);
          })
          .catch((err) => {
            setOpenAlert(true);
            setAlertMessage(err.response ? err.response.data.message : 'An error occurred');
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        router.push("/")
      })
  }, [])

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let title = data.get("title")
    title = title ? title.toString() : ""
    let year = data.get("year")
    year = year ? year.toString() : ""
    let artist = data.get("artist")
    artist = artist ? artist.toString() : ""

    const filtered = music.filter(eachMusic => {
      return eachMusic.title.toLowerCase().includes(title.toLowerCase()) && eachMusic.year.toString().includes(year) && eachMusic.artist.toLowerCase().includes(artist.toLowerCase())
    })

    setFilteredMusic(filtered)

  }
  const handleNavChange = (view: string) => {
    setSelectedView(view)
  }
  const handleLogOut = () => {
    sessionStorage.removeItem("token")
    router.push("/")
  }
  const handleSubscribe = (title: string, artist: string, year: number, img: string) => {
    const addSubscriptionRequestData = {
      music: title,
      user: user.email
    }

    axios.post("https://cq2evmczs1.execute-api.ap-southeast-2.amazonaws.com/Prod/addSubscription", addSubscriptionRequestData)
      .then((res) => {
        setOpenAlert(true)
        setAlertMessage(res.data.message)
      })
      .catch((err) => {
        setOpenAlert(true)
        setAlertMessage(err.response.data.message)
      })

    setSubscribedDict(prevState => ({
      ...prevState,
      [title]: true
    }));

    const newMusic: Music = {
      title,
      artist,
      year,
      img_url: img
    }

    setSubscriptions(prevSubscriptions => [...prevSubscriptions, newMusic]);
  }
  const handleRemove = (title: string) => {
    const removeSubscriptionsRequestData = {
      music: title,
      user: user.email
    }

    axios.post("https://cq2evmczs1.execute-api.ap-southeast-2.amazonaws.com/Prod/removeSubscription", removeSubscriptionsRequestData)
      .then((res) => {
        setOpenAlert(true)
        setAlertMessage(res.data.message)
      })
      .catch((err) => {
        setOpenAlert(true)
        setAlertMessage(err.response.data.message)
      })

    setSubscribedDict(prevState => {
      const newState = { ...prevState };
      delete newState[title];
      return newState;
    });

    setSubscriptions(prevSubscriptions => prevSubscriptions.filter(music => music.title !== title))
  }

  const getNavStyles = (itemName: string): React.CSSProperties => ({
    backgroundColor: selectedView === itemName ? theme.palette.primary.main : "inherit",
    color: selectedView === itemName ? "white" : "inherit",
  });

  if (loading) {
    return (
      <Grid container component="main" sx={{ height: '100vh', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <CssBaseline />
        <LinearProgress color="inherit" sx={{ width: "500px" }} />
        <LinearProgress color="inherit" sx={{ width: "500px", mt: 2 }} />
        <LinearProgress color="inherit" sx={{ width: "500px", mt: 2 }} />
      </Grid >
    )
  } else {
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
              Welcome, {user.username}
            </Typography>
            <Button variant="contained" color='error' onClick={handleLogOut}>Log Out</Button>
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
          {selectedView === "subscriptions" &&
            <>
              {subscriptions.length === 0 && <Typography
                component="h1"
                variant="h6"
                color="inherit"
                sx={{ m: 4 }}
              >
                No Subscriptions
              </Typography>}
              {subscriptions.length !== 0 && <Grid container spacing={4} padding={4}>
                {subscriptions.map(subscription => {
                  return (
                    <Grid item xs={4}>
                      <SubscriptionCard title={subscription.title} img={subscription.img_url} year={subscription.year} artist={subscription.artist} handleRemove={handleRemove} />
                    </Grid>
                  )
                })}
              </Grid >}
            </>
          }
          {selectedView === "query" &&
            <>
              <Box component="form" noValidate onSubmit={handleSearch}>
                <Grid container spacing={4} padding={4}>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Search By Title"
                      name="title"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Search By Year"
                      name="year"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Search By Artist"
                      name="artist"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1 }}
                    >
                      Query
                    </Button>
                  </Grid>
                </Grid >
              </Box>
              {filteredMusic.length === 0 && <Typography
                component="h1"
                variant="h6"
                color="inherit"
                sx={{ m: 4 }}
              >
                No result is retrieved. Please query again
              </Typography>}
              {filteredMusic.length !== 0 &&
                <Grid container spacing={4} padding={4}>
                  {filteredMusic.map(eachMusic => {
                    return (
                      <Grid item xs={4}>
                        <QueryCard title={eachMusic.title} img={eachMusic.img_url} year={eachMusic.year} artist={eachMusic.artist} subscribed={subscribedDict[eachMusic.title] || false} handleSubscribe={handleSubscribe} />
                      </Grid>
                    )
                  })}
                </Grid>}
            </>
          }
        </Box>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
          <Alert
            onClose={() => setOpenAlert(false)}
            severity="info"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box >
    );
  }
}