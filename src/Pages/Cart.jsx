import { Link } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { ShoppingCart, AttachMoney, Delete, MonetizationOn } from '@mui/icons-material';
import CartItem from '../Components/CartItem';

const Cart = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <ShoppingCart fontSize="medium" />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            position: 'relative',
            pl: 2,
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '4px',
              backgroundColor: 'black',
            },
          }}
        >
          Your Shopping Cart
        </Typography>
      </Stack>

      <Box py={4} display="flex" flexDirection="column" gap={2}>
        <CartItem />
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'center' }}
        spacing={2}
        mt={4}
        mb={2}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          justifyContent={{ xs: 'center', md: 'flex-start' }}
        >
          <MonetizationOn color="primary" />
          <Typography variant="body1" fontWeight="600">
            Your Total Price Cart:
          </Typography>
          <Typography variant="body1" color="primary" fontWeight="bold">
            945
          </Typography>
        </Stack>

        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          fullWidth={{ xs: true, md: false }}
        >
          Delete Cart
        </Button>
      </Stack>

      <Box my={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          component={Link}
          to="/payment"
        >
          Next Step (Payment)
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
