import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Avatar, 
  Menu, 
  MenuItem 
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1e1e2f', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif', fontWeight: 700, letterSpacing: 1, color: '#ffffff' }}>
          My Shop
        </Typography>
        
        <CustomNavButton to="/" icon={<HomeIcon />} text="Home" currentPath={location.pathname} />
        <CustomNavButton to="/cart" icon={<ShoppingCartIcon />} text="Cart" currentPath={location.pathname} />
        <CustomNavButton to="/dashboard" icon={<DashboardIcon />} text="Dashboard" currentPath={location.pathname} />
        
        {isLoggedIn ? (
          <>
            <CustomNavButton to="/wishlist" icon={<ShoppingCartIcon />} text="Wishlist" currentPath={location.pathname} />
            <Button
              onClick={handleMenuOpen}
              sx={{ 
                color: '#ffffff', 
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Avatar 
                alt={user.firstName} 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: '#90caf9',
                  color: '#1e1e2f',
                  fontWeight: 'bold'
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
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: '#e57373' }}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <CustomNavButton to="/login" icon={<LoginIcon />} text="Login" currentPath={location.pathname} />
        )}
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
        } 
      }}
    >
      {text}
    </Button>
  );
};

export default Navbar;