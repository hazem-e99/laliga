import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Avatar, 
  Menu, 
  MenuItem,
  Divider,
  Box,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
  Badge
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { CartContext } from '../Contexts/cartContext';
import { WishlistContext } from '../Contexts/wishlistContext';

const Navbar = () => {
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const renderDesktopNav = () => (
    <>
      <CustomNavButton to="/" icon={<HomeIcon />} text="Home" currentPath={location.pathname} />
      
      {/* رابط لوحة التحكم متاح للجميع */}
      <CustomNavButton 
        to="/admin" 
        icon={<DashboardIcon />} 
        text="Dashboard" 
        currentPath={location.pathname} 
      />

      {isLoggedIn ? (
        <>
          <CustomNavButton
            to="/cart"
            icon={
              <Badge badgeContent={cartCount} color="error" showZero>
                <ShoppingCartIcon />
              </Badge>
            }
            text="Cart"
            currentPath={location.pathname}
          />
          <CustomNavButton
            to="/wishlist"
            icon={
              <Badge badgeContent={wishlistCount} color="error" showZero>
                <FavoriteBorderIcon />
              </Badge>
            }
            text="Wishlist"
            currentPath={location.pathname}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Button
              onClick={handleMenuOpen}
              sx={{ 
                color: '#ffffff', 
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Avatar 
                alt={user.firstName} 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: '#90caf9',
                  color: '#1e1e2f',
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}
              >
                {user.firstName?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                {user.firstName || 'User'}
              </Typography>
              <ExpandMoreIcon fontSize="small" />
            </Button>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 1,
                  minWidth: 200,
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  overflow: 'visible',
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
                  }
                }
              }}
            >
              <MenuItem onClick={handleProfileClick} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <PersonOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              
              <Divider sx={{ my: 0.5 }} />
              
              <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ color: 'error' }}>
                  Logout
                </ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </>
      ) : (
        <CustomNavButton to="/login" icon={<LoginIcon />} text="Login" currentPath={location.pathname} />
      )}
    </>
  );

  const renderMobileNav = () => (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
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
            color: '#ffffff'
          }
        }}
      >
        <Box
          sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}
          role="presentation"
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            p: 2,
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700 }}>
              My Shop
            </Typography>
            <IconButton onClick={toggleDrawer(false)} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List sx={{ flexGrow: 1 }}>
            <NavItem to="/" icon={<HomeIcon />} text="Home" currentPath={location.pathname} onClick={toggleDrawer(false)} />
            <NavItem to="/admin" icon={<DashboardIcon />} text="Dashboard" currentPath={location.pathname} onClick={toggleDrawer(false)} />
            
            {isLoggedIn && (
              <>
                <NavItem to="/cart" icon={<ShoppingCartIcon />} text="Cart" currentPath={location.pathname} onClick={toggleDrawer(false)} />
                <NavItem to="/wishlist" icon={<FavoriteBorderIcon />} text="Wishlist" currentPath={location.pathname} onClick={toggleDrawer(false)} />
              </>
            )}
          </List>
          
          <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
            {isLoggedIn ? (
              <>
                <NavItem to="/profile" icon={<PersonOutlineIcon />} text="Profile" currentPath={location.pathname} onClick={toggleDrawer(false)} />
                <ListItem 
                  button 
                  onClick={() => {
                    handleLogout();
                    toggleDrawer(false)();
                  }}
                  sx={{
                    color: '#e57373',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <NavItem to="/login" icon={<LoginIcon />} text="Login" currentPath={location.pathname} onClick={toggleDrawer(false)} />
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1e1e2f', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: isMobile ? 0 : 1, fontFamily: 'Roboto, sans-serif', fontWeight: 700, letterSpacing: 1, color: '#ffffff' }}>
          My Shop
        </Typography>
        
        {isMobile ? renderMobileNav() : renderDesktopNav()}
      </Toolbar>
    </AppBar>
  );
};

const CustomNavButton = ({ to, icon, text, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Button 
      component={Link} 
      to={to} 
      startIcon={icon} 
      sx={{ 
        color: isActive ? '#90caf9' : '#ffffff', 
        fontWeight: isActive ? 600 : 500, 
        fontSize: '0.95rem', 
        textTransform: 'none', 
        marginLeft: 2, 
        borderBottom: isActive ? '2px solid #90caf9' : 'none', 
        borderRadius: 0, 
        transition: 'all 0.3s ease', 
        '&:hover': { 
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          color: '#90caf9' 
        },
        '& .MuiButton-startIcon': {
          marginRight: '6px'
        }
      }}
    >
      {text}
    </Button>
  );
};

const NavItem = ({ to, icon, text, currentPath, onClick }) => {
  const isActive = currentPath === to;
  return (
    <ListItem 
      button 
      component={Link} 
      to={to}
      onClick={onClick}
      sx={{
        color: isActive ? '#90caf9' : '#ffffff',
        fontWeight: isActive ? 600 : 400,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#90caf9'
        }
      }}
    >
      <ListItemIcon sx={{ color: 'inherit' }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default Navbar;