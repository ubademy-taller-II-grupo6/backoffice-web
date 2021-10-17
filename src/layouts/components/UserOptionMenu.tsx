import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx'; // para el manejo de className medio dinamico

import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Box from '@mui/material/Box';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreIcon from '@mui/icons-material/MoreVert';
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import Typography from '@mui/material/Typography';

import { userStorage } from 'userSession/userStorage';

const useStyles : any = makeStyles((theme: Theme) => createStyles({
    boxContentMd: {
        alignItems: 'center'
    },
    nameUser: {
        alignSelf: "center",
        paddingLeft: "10px"
    },
    nameUserMenuMobile: {
        textAlign: 'center'
    },
    rotateIcon: {
        transform: 'rotate(180deg)'
    }
}));

export function UserOptionMenu () {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setMobileMoreAnchorEl(event.currentTarget);

    const handleLogOut = () => userStorage.logOutUser();
    
    const menuId = 'menu-user-option';
    const renderMenu = (
        <Menu anchorEl={anchorEl}
              id={menuId}
              open={isMenuOpen}
              keepMounted
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem component={Link} 
                      to="/myProfile"
                      onClick={handleMenuClose}>
                <ListItemIcon>
                    <PermContactCalendarRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Mi perfil" />
            </MenuItem>
            <MenuItem component={Link} 
                      to="/"
                      onClick={handleLogOut}>
                <ListItemIcon>
                    <LogoutRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Salir" />
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'menu-user-option-mobile';
    const renderMobileMenu = (
        <Menu id={mobileMenuId}
              anchorEl={mobileMoreAnchorEl}
              keepMounted
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Typography component="div" variant="overline" className={classes.nameUserMenuMobile}>
                { userStorage.getFullName() }                        
            </Typography>
            <Divider />
            <MenuItem component={Link} 
                      to="/myProfile"
                      onClick={handleMenuClose}>
                <ListItemIcon>
                    <PermContactCalendarRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Mi perfil" />
            </MenuItem>
            <MenuItem component={Link} 
                      to="/"
                      onClick={handleLogOut}>
                <ListItemIcon>
                    <LogoutRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Salir" />
            </MenuItem>
        </Menu>
    );

    return (
        <div>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} className={classes.boxContentMd}>
                <AccountCircle />
                <Typography component="div" variant="overline" className={classes.nameUser}>
                    { userStorage.getFullName() }                        
                </Typography>
                <IconButton size="large"
                            edge="end"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            className={clsx("", {
                                [classes.rotateIcon]: isMenuOpen || isMobileMenuOpen
                            })}
                >
                    <KeyboardArrowDownRoundedIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton size="large"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit">
                    <MoreIcon />
                </IconButton>
            </Box>
            { renderMobileMenu }
            { renderMenu }            
        </div>
    );
}