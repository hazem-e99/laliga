import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar, Menu, MenuItem, Divider, List, ListItem, ListItemIcon, ListItemText, Badge, Box, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import CustomNavButton from './CustomNavButton';
import NavItem from './NavItem';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const cartCount = cart.length;
  const { wishlist } = useContext(WishlistContext);
  const wishlistCount = wishlist.length;

  const [isLanguageEnglish, setIsLanguageEnglish] = useState(i18n.language === 'en');
  const toggleLanguage = () => {
    const newLang = isLanguageEnglish ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    setIsLanguageEnglish(!isLanguageEnglish);
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    handleMenuClose();
    navigate('/login');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const renderDesktopNav = () => (
    <>
      <CustomNavButton to="/" icon={<HomeIcon />} text={t('nav.home')} currentPath={location.pathname} />
      <CustomNavButton to="/admin" icon={<DashboardIcon />} text={t('nav.dashboard')} currentPath={location.pathname} />

      {isLoggedIn ? (
        <>
          <CustomNavButton
            to="/cart"
            icon={
              <Badge badgeContent={cartCount} color="error" showZero>
                <ShoppingCartIcon />
              </Badge>
            }
            text={t('nav.cart')}
            currentPath={location.pathname}
          />
          <CustomNavButton
            to="/wishlist"
            icon={
              <Badge badgeContent={wishlistCount} color="error" showZero>
                <FavoriteBorderIcon />
              </Badge>
            }
            text={t('nav.wishlist')}
            currentPath={location.pathname}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Button onClick={handleMenuOpen} sx={{ color: '#fff', textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#90caf9', color: '#1e1e2f', fontWeight: 'bold' }}>
                {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
              <Typography variant="body1">{user.firstName || 'User'}</Typography>
              <ExpandMoreIcon fontSize="small" />
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleProfileClick}>
                <ListItemIcon><PersonOutlineIcon fontSize="small" /></ListItemIcon>
                <ListItemText>{t('nav.profile')}</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon><ExitToAppIcon fontSize="small" color="error" /></ListItemIcon>
                <ListItemText primaryTypographyProps={{ color: 'error' }}>{t('nav.logout')}</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </>
      ) : (
        <CustomNavButton to="/login" icon={<LoginIcon />} text={t('nav.login')} currentPath={location.pathname} />
      )}
      <Button onClick={toggleLanguage} sx={{ color: '#fff', ml: 2, textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
        <LanguageIcon fontSize="small" />
        <Typography variant="body1">{isLanguageEnglish ? 'AR' : 'EN'}</Typography>
      </Button>
    </>
  );

  const renderMobileNav = () => (
    <>
      <IconButton onClick={toggleDrawer(true)} color="inherit">
        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { width: 280, backgroundColor: '#1e1e2f', color: '#fff' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6">My Shop</Typography>
          <IconButton onClick={toggleDrawer(false)} color="inherit"><CloseIcon /></IconButton>
        </Box>
        <List>
          <NavItem to="/" icon={<HomeIcon />} text={t('nav.home')} currentPath={location.pathname} onClick={toggleDrawer(false)} />
          <NavItem to="/admin" icon={<DashboardIcon />} text={t('nav.dashboard')} currentPath={location.pathname} onClick={toggleDrawer(false)} />
          {isLoggedIn && (
            <>
              <NavItem to="/cart" icon={<ShoppingCartIcon />} text={t('nav.cart')} currentPath={location.pathname} onClick={toggleDrawer(false)} />
              <NavItem to="/wishlist" icon={<FavoriteBorderIcon />} text={t('nav.wishlist')} currentPath={location.pathname} onClick={toggleDrawer(false)} />
            </>
          )}
        </List>
        <Box sx={{ p: 2 }}>
          {isLoggedIn ? (
            <>
              <NavItem to="/profile" icon={<PersonOutlineIcon />} text={t('nav.profile')} currentPath={location.pathname} onClick={toggleDrawer(false)} />
              <ListItem button onClick={() => { handleLogout(); toggleDrawer(false)(); }} sx={{ color: '#e57373' }}>
                <ListItemIcon sx={{ color: 'inherit' }}><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary={t('nav.logout')} />
              </ListItem>
            </>
          ) : (
            <NavItem to="/login" icon={<LoginIcon />} text={t('nav.login')} currentPath={location.pathname} onClick={toggleDrawer(false)} />
          )}
        </Box>
      </Drawer>
    </>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e1e2f' }}>
      <Toolbar>{isMobile ? renderMobileNav() : renderDesktopNav()}</Toolbar>
    </AppBar>
  );
};

export default Navbar;
