import React, { useState } from 'react';
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
  InputLabel,
  Select,
  MenuItem,
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

  const steps = ['Address Details', 'Order Summary', 'Payment'];

  // Sample order items
  const orderItems = [
    { id: 1, name: 'Wireless Headphones', price: 2999, quantity: 1, image: '🎧' },
    { id: 2, name: 'Smartphone Case', price: 599, quantity: 2, image: '📱' },
    { id: 3, name: 'USB Cable', price: 299, quantity: 1, image: '🔌' }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50;
  const total = subtotal + shipping;

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePlaceOrder = () => {
    if (formData.paymentMethod === 'cod') {
      alert('Order placed successfully! You will pay ₹' + total + ' on delivery.');
    } else {
      setActiveStep(2); // Go to payment step
    }
  };

  const handlePayment = () => {
    let message = 'Order placed successfully! ';
    if (formData.paymentMethod === 'card') {
      message += 'Payment processed via demo card gateway.';
    } else if (formData.paymentMethod === 'upi') {
      message += 'Payment processed via UPI ID: ' + formData.upiId;
    }
    alert(message + ' This is a demo checkout.');
  };

  // Step 1: Address Details
  const AddressStep = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Shipping Address
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{xs:12,sm:6,md:6}}>
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
        <Grid  size={{xs:12,sm:6,md:6}}>
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
        <Grid  size={{xs:12,sm:6,md:6}}>
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
        <Grid item size={{xs:12,sm:12,md:12}}>
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
        <Grid  size={{xs:12,sm:4,md:4}}>
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
        <Grid  size={{xs:12,sm:4,md:4}}>
          <FormControl fullWidth required>
            <TextField
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              label="State"
            >

            </TextField>
          </FormControl>
        </Grid>
        <Grid size={{xs:12,sm:4,md:4}}>
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
  );

  // Step 2: Order Summary
  const OrderSummaryStep = () => (
    <Box>
      <Typography variant="h5" gutterBottom>
        Order Summary
      </Typography>
      
      {/* Shipping Address Summary */}
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

      {/* Order Items */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Items Ordered
          </Typography>
          <List>
            {orderItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      {item.image}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`Qty: ${item.quantity} × ₹${item.price}`}
                  />
                  <Typography variant="h6">
                    ₹{item.price * item.quantity}
                  </Typography>
                </ListItem>
                {index < orderItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Price Breakdown */}
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

      {/* Payment Method Selection */}
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
                value="card"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label="UPI Payment"
              />
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
  );

  // Step 3: Payment
  const PaymentStep = () => (
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
              <Grid size={{xs:12,sm:6,md:6}}>
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
              <Grid size={{xs:12,sm:6,md:6}}>
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
              <Grid size={{xs:12,sm:6,md:6}}>
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
              <Grid size={{xs:12,sm:6,md:6}}>
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

      {/* Amount Summary */}
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
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressStep />;
      case 1:
        return <OrderSummaryStep />;
      case 2:
        return <PaymentStep />;
      default:
        return 'Unknown step';
    }
  };

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
              onClick={handlePlaceOrder}
              size="large"
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