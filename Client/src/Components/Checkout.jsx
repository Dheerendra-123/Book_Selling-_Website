

import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Alert,
  Container
} from '@mui/material';
import { clearCart, setCartItems } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../api/api';
import { handleError, handleSuccess } from '../Utils/Tostify';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: ''
  });
  const navigate = useNavigate();
  const steps = ['Address Details', 'Order Summary', 'Payment'];
  const orderListItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // FIX 1: Prevent multiple cart fetches
  const hasFetchedCart = useRef(false);

  useEffect(() => {
    // Only fetch cart once
    if (hasFetchedCart.current) return;

    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const orderItems = res.data.items.map((i) => i.productId);
        dispatch(setCartItems(orderItems));
        hasFetchedCart.current = true
      } catch (err) {
        console.error('Failed to load cart:', err);
        hasFetchedCart.current = true;
      }
    };

    fetchCart();
  }, []); // Remove dispatch dependency

  // FIX 2: Memoize calculated values to prevent re-renders
  const subtotal = React.useMemo(() => {
    return orderListItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [orderListItems]);

  const shipping = 50;
  const total = React.useMemo(() => subtotal + shipping, [subtotal]);

  // FIX 3: Stable event handlers
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;

    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);


  const handlePayment = useCallback(async () => {
    const token = localStorage.getItem('token');

    const orderPayload = {
      items: orderListItems.map(item => ({
        product: item._id,
        quantity: 1
      })),
      shippingAddress: {
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      paymentMethod: formData.paymentMethod,
      totalAmount: total
    };

    try {
      await api.post('/api/orders', orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      handleSuccess('Order placed successfully! Thank you for your purchase.');
      await api.delete('/api/cart', { headers: { Authorization: `Bearer ${token}` } });
      dispatch(clearCart());
      navigate('/dashboard/myOrders');
    } catch (error) {
      console.error('Payment failed:', error);
      handleError('Something went wrong while placing your order.');
    }
  }, [orderListItems, formData, total]);



  // FIX 4: Move step components outside and make them stable
  const renderAddressStep = useCallback(() => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Shipping Address
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            required
            fullWidth
            name="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            required
            fullWidth
            name="mobile"
            label="Mobile Number"
            value={formData.mobile}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="+91 XXXXX XXXXX"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <TextField
            required
            fullWidth
            name="address"
            label="Address"
            multiline
            rows={3}
            value={formData.address}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="House No, Street, Area"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <TextField
            required
            fullWidth
            name="city"
            label="City"
            value={formData.city}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <TextField
            required
            fullWidth
            name="state"
            label="State"
            value={formData.state}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 4 }}>
          <TextField
            required
            fullWidth
            name="pincode"
            label="PIN Code"
            value={formData.pincode}
            onChange={handleInputChange}
            variant="outlined"
            inputProps={{ maxLength: 6 }}
          />
        </Grid>
      </Grid>
    </Box>
  ), [formData, handleInputChange]);

  const renderOrderSummaryStep = useCallback(() => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order Summary
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formData.fullName}<br />
            {formData.address}<br />
            {formData.city}, {formData.state} - {formData.pincode}<br />
            Mobile: {formData.mobile}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Items Ordered
          </Typography>

          {orderListItems.map((item, index) => (
            <List key={item._id || index}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    alt={item.title}
                    src={item.images?.[0]}
                    variant="rounded"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={`Qty: 1 × ₹${item.price}`}
                />
                <Typography variant="h6">
                  ₹{item.price}
                </Typography>
              </ListItem>
              {index < orderListItems.length - 1 && <Divider />}
            </List>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Subtotal</Typography>
            <Typography>₹{subtotal}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Shipping</Typography>
            <Typography>₹{shipping}</Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">₹{total}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Payment Method</FormLabel>
            <RadioGroup
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Cash on Delivery"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  ), [formData, handleInputChange, orderListItems, subtotal, total]);

  const renderPaymentStep = useCallback(() => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Payment Details
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        This is a demo payment gateway. No real transactions will be processed.
      </Alert>

      {formData.paymentMethod === 'card' && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Card Payment
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                  required
                  fullWidth
                  name="cardholderName"
                  label="Cardholder Name"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                  required
                  fullWidth
                  name="cardNumber"
                  label="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="1234 5678 9012 3456"
                  inputProps={{ maxLength: 19 }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                  required
                  fullWidth
                  name="expiryDate"
                  label="Expiry Date"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="MM/YY"
                  inputProps={{ maxLength: 5 }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <TextField
                  required
                  fullWidth
                  name="cvv"
                  label="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="123"
                  inputProps={{ maxLength: 3 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {formData.paymentMethod === 'upi' && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              UPI Payment
            </Typography>
            <TextField
              required
              fullWidth
              name="upiId"
              label="UPI ID"
              value={formData.upiId}
              onChange={handleInputChange}
              variant="outlined"
              placeholder="username@upi"
              helperText="Enter your UPI ID (e.g., 9876543210@paytm)"
            />
          </CardContent>
        </Card>
      )}

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Total Amount</Typography>
            <Typography variant="h4" color="primary">
              ₹{total}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  ), [formData, handleInputChange, total]);

  const getStepContent = useCallback((step) => {
    switch (step) {
      case 0:
        return renderAddressStep();
      case 1:
        return renderOrderSummaryStep();
      case 2:
        return renderPaymentStep();
      default:
        return 'Unknown step';
    }
  }, [renderAddressStep, renderOrderSummaryStep, renderPaymentStep]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 4 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>

          {activeStep === 1 ? (
            <Button
              variant="contained"
              onClick={handlePayment}
              size="large"
              disabled={!formData.paymentMethod}
            >
              Place Order
            </Button>
          ) : activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handlePayment}
              size="large"
              color="success"
            >
              Pay Now
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Continue
            </Button>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default Checkout;