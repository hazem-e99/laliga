import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Box,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CartContext } from '../Contexts/cartContext';
import { WishlistContext } from '../Contexts/wishlistContext';
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

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isAdmin = user?.email?.startsWith('admin2025'); // ✅ الشرط هنا
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

  const renderLogo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LaLiga_logo_2023.svg/1200px-LaLiga_logo_2023.svg.png"
          alt="Logo"
          style={{ height: 40, objectFit: 'contain' }}
        />
      </Link>
    </Box>
  );

  const renderDesktopNav = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {renderLogo()}
        <Button
          component={Link}
          to="/"
          startIcon={<HomeIcon />}
          sx={{
            color: location.pathname === '/' ? 'primary.main' : '#fff',
            textTransform: 'none',
            mx: 1,
          }}
        >
          {t('nav.home')}
        </Button>

        {isAdmin && (
          <Button
            component={Link}
            to="/admin"
            startIcon={<DashboardIcon />}
            sx={{
              color: location.pathname === '/admin' ? 'primary.main' : '#fff',
              textTransform: 'none',
              mx: 1,
            }}
          >
            {t('nav.dashboard')}
          </Button>
        )}

        <Button
          onClick={toggleLanguage}
          startIcon={<LanguageIcon />}
          sx={{
            color: '#fff',
            textTransform: 'none',
            mx: 1,
          }}
        >
          {isLanguageEnglish ? 'AR' : 'EN'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          component={Link}
          to="/cart"
          startIcon={
            <Badge badgeContent={cartCount} color="error" showZero>
              <ShoppingCartIcon />
            </Badge>
          }
          sx={{
            color: location.pathname === '/cart' ? 'primary.main' : '#fff',
            textTransform: 'none',
            mx: 1,
          }}
        >
          {t('nav.cart')}
        </Button>

        <Button
          component={Link}
          to="/wishlist"
          startIcon={
            <Badge badgeContent={wishlistCount} color="error" showZero>
              <FavoriteBorderIcon />
            </Badge>
          }
          sx={{
            color: location.pathname === '/wishlist' ? 'primary.main' : '#fff',
            textTransform: 'none',
            mx: 1,
          }}
        >
          {t('nav.wishlist')}
        </Button>

        {isLoggedIn ? (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Button
              onClick={handleMenuOpen}
              sx={{
                color: '#fff',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: '#90caf9',
                  color: '#1e1e2f',
                  fontWeight: 'bold',
                }}
              >
                {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
              <Typography variant="body1">{user.firstName || 'User'}</Typography>
              <ExpandMoreIcon fontSize="small" />
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleProfileClick}>
                <ListItemIcon>
                  <PersonOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('nav.profile')}</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ color: 'error' }}>
                  {t('nav.logout')}
                </ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/login"
            startIcon={<LoginIcon />}
            sx={{
              color: location.pathname === '/login' ? 'primary.main' : '#fff',
              textTransform: 'none',
              mx: 1,
            }}
          >
            {t('nav.login')}
          </Button>
        )}
      </Box>
    </Box>
  );

  const renderMobileNav = () => (
    <>
      <IconButton onClick={toggleDrawer(true)} color="inherit">
        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: '#1e1e2f',
            color: '#fff',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          {renderLogo()}
          <IconButton onClick={toggleDrawer(false)} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.home')} />
          </ListItem>

          {isAdmin && (
            <ListItem button component={Link} to="/admin" onClick={toggleDrawer(false)}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.dashboard')} />
            </ListItem>
          )}

          <ListItem button component={Link} to="/cart" onClick={toggleDrawer(false)}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.cart')} />
          </ListItem>

          <ListItem button component={Link} to="/wishlist" onClick={toggleDrawer(false)}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <FavoriteBorderIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.wishlist')} />
          </ListItem>

          <ListItem button onClick={toggleLanguage}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary={isLanguageEnglish ? 'AR' : 'EN'} />
          </ListItem>
        </List>
        <Box sx={{ p: 2 }}>
          {isLoggedIn ? (
            <>
              <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
                <ListItemIcon sx={{ color: '#fff' }}>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={t('nav.profile')} />
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  handleLogout();
                  toggleDrawer(false)();
                }}
                sx={{ color: '#e57373' }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={t('nav.logout')} />
              </ListItem>
            </>
          ) : (
            <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.login')} />
            </ListItem>
          )}
        </Box>
      </Drawer>
    </>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e1e2f' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {isMobile ? renderMobileNav() : renderDesktopNav()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
