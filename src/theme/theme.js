import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4361ee', 
      light: '#4895ef',
      dark: '#3a0ca3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f72585', 
      light: '#ff70a6',
      dark: '#b5179e',
    },
    error: {
      main: '#ef233c',
    },
    success: {
      main: '#4cc9f0', 
    },
    background: {
      default: '#f8f9fa', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#2b2d42', 
      secondary: '#8d99ae',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif', 
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: 600,
      letterSpacing: '-0.3px',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', 
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.04)',
        },
      },
    },
  },
});

export default theme;