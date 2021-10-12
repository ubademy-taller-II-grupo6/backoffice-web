import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { UserOptionMenu } from './components/UserOptionMenu';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import LogoUbademy from 'assets/images/logoUbademy.png';

const drawerWidthOpen = 220;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{open?: boolean;}>
    (({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidthOpen}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })<AppBarProps>
    (({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    ...(open && {
        width: `calc(100% - ${drawerWidthOpen}px)`,
        marginLeft: `${drawerWidthOpen}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const DrawerEnd = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
    placeItems: 'flex-end',
    marginTop: 'auto'
}));

interface HomeLayoutProps {
    children?: React.ReactNode
}

export function HomeLayout(props: HomeLayoutProps) {
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Ubademy
                    </Typography>

                    <UserOptionMenu />
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    whiteSpace: "nowrap",
                    width: drawerWidthOpen,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        color: "#a2a3b7",
                        backgroundColor: "#1e1e2d",
                        width: drawerWidthOpen,
                        boxSizing: 'border-box',
                    },
                    '& > .MuiPaper-root .MuiListItemIcon-root': {
                        color: "#a2a3b7",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} style={{color: "#a2a3b7"}}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <SupervisorAccountRoundedIcon fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                    </ListItem>
                </List>

                <DrawerEnd>
                    <Divider />
                    <img src={LogoUbademy} className="logo-ubademy" alt="logoUbademy"></img>
                </DrawerEnd>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                { props.children }
            </Main>
        </Box>
    );
}