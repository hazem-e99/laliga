import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
    Paper,
  } from '@mui/material';
  import CreditCardIcon from '@mui/icons-material/CreditCard';
  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';
  import { useContext } from 'react';
import { CartContext } from '../Contexts/cartContext';
import { useTranslation } from 'react-i18next';
  const Payment = () => {
    const navigate = useNavigate();
    const [isPaid, setIsPaid] = useState(false);
    const { t } = useTranslation(); 
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
  
    const [errors, setErrors] = useState({});
    const { clearCart } = useContext(CartContext); 

    const validate = () => {
      const newErrors = {};
      if (!/^\d{16}$/.test(cardNumber)) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (cardHolder.trim().length < 3) {
        newErrors.cardHolder = 'Enter full cardholder name';
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        newErrors.expiry = 'Expiry must be in MM/YY format';
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
      return newErrors;
    };
  
    const handlePayment = () => {
      const validationErrors = validate();
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        setIsPaid(true);
        clearCart(); 
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    };
  
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <CreditCardIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
            {t('payment_details')}
            </Typography>
          </Stack>
  
          {!isPaid ? (
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ''))}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
                fullWidth
              />
  
              <TextField
                label="Card Holder Name"
                placeholder="Hazem Mohamed"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                error={!!errors.cardHolder}
                helperText={errors.cardHolder}
                fullWidth
              />
  
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  error={!!errors.expiry}
                  helperText={errors.expiry}
                  fullWidth
                />
  
                <TextField
                  label="CVV"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                  fullWidth
                />
              </Stack>
  
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ mt: 2 }}
                onClick={handlePayment}
              >
               {t('pay_now')}
              </Button>
            </Box>
          ) : (
            <Box textAlign="center" mt={5}>
              <Typography variant="h5" color="green" fontWeight="bold" mb={2}>
              {t('payment_success')}
              </Typography>
              <Typography variant="body1">
              {t('payment_thank_you')}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    );
  };
  
  export default Payment;
  