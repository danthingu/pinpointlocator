import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MapIcon from "@material-ui/icons/Map";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Context from "../context";
import Signout from "../components/Auth/Signout";


import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const drawerWidth = 240;

const Header = ({ classes }) => {
  const mobileSize = useMediaQuery("(max-width: 650px)");
  const persistentDrawerTheme = createMuiTheme({
    direction: 'ltr',
  });
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { state } = useContext(Context);
  const { currentUser } = state;
  return (
    <div className={classes.root}>
      <AppBar
            position="fixed"
            className={(classes.appBar, {
            [classes.appBarShift]: open,
            })}>
          <Toolbar style={{backgroundColor: 'black'}}>
              <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
              <div className={classes.grow}>

              <MapIcon className={classes.icon} />
              <Typography
                className={mobileSize ? classes.mobile : ""}
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
              >
                PinPointLocators
              </Typography>
            </div>

            {/* Current User Info */}
            {currentUser && (
              <div className={classes.grow}>
                <img
                  className={classes.picture}
                  src={currentUser.picture}
                  alt={currentUser.name}
                />
                <Typography
                  className={mobileSize ? classes.mobile : ""}
                  variant="h5"
                  color="inherit"
                  noWrap
                >
                  {currentUser.name}
                </Typography>
              </div>
            )}

            {/* Signout Button */}
            <Signout />
          </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} style={{color: 'white'}}>
            {persistentDrawerTheme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider style={{backgroundColor: 'white'}}/>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon style={{color: 'white'}}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText classes={{primary:classes.listItemText}} primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider style={{backgroundColor: 'white'}}/>
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon style={{color: 'white'}}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText classes={{primary:classes.listItemText}} primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing,
    color: "black",
    fontSize: 45
  },
  mobile: {
    display: "none"
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    marginRight: theme.spacing.unit * 2
  },
  listItemText:{
    fontColor:'white',//Insert your required size
    color: 'white'
  },
  appBar: {
    backgroundColor: 'black !important',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing.unit * 2,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'black'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    //padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

export default withStyles(styles)(Header);
