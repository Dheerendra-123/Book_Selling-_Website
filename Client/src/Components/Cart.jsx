// import {
//   Box,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Button,
//   Divider,
//   Grid,
//   Paper,
//   Stack,
//   Chip,
//   Badge,
//   TextField,
//   Fade,
//   Alert,
//   AlertTitle,
//   Skeleton
// } from '@mui/material';
// import {
//   Add,
//   Remove,
//   Delete,
//   ShoppingCartCheckout,
//   LocalShipping,
//   Security,
//   Verified,
//   ShoppingBag,
//   ArrowBack,
//   Discount,
//   CreditCard
// } from '@mui/icons-material';
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart,clearCart } from '../../redux/cartSlice';
// import { useNavigate } from 'react-router-dom';

// const CartPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const [loading, setLoading] = useState(true);
//   const [discount, setDiscount] = useState(0);

//   useEffect(() => {
//     // Simulate loading
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Calculate totals
//   const subtotal = cartItems.reduce((total, item) => total + (item.price), 0);
//   const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
//   const discountAmount = (subtotal * discount) / 100;
//   const total = subtotal + shipping - discountAmount;

//   const handleRemoveItem = (itemId) => {
//     dispatch(removeFromCart(itemId));
//   };


//   const handleCheckout = () => {
//     // Navigate to checkout page
//     navigate('/checkout');
//   };

//   if (loading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={8}>
//             {[1, 2, 3].map((item) => (
//               <Card key={item} sx={{ mb: 3, p: 2 }}>
//                 <Stack direction="row" spacing={3}>
//                   <Skeleton variant="rectangular" width={100} height={120} />
//                   <Box sx={{ flex: 1 }}>
//                     <Skeleton variant="text" width="60%" height={32} />
//                     <Skeleton variant="text" width="40%" height={24} />
//                     <Skeleton variant="text" width="30%" height={24} />
//                   </Box>
//                 </Stack>
//               </Card>
//             ))}
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Skeleton variant="rectangular" height={300} />
//           </Grid>
//         </Grid>
//       </Container>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
//         <Paper
//           elevation={0}
//           sx={{
//             p: 6,
//             borderRadius: 4,
//             background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
//             border: '1px solid',
//             borderColor: 'divider'
//           }}
//         >
//           <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
//           <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
//             Your Cart is Empty
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
//             Looks like you haven't added any books to your cart yet.
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             startIcon={<ArrowBack />}
//             onClick={() => navigate('/books')}
//             sx={{
//               px: 4,
//               py: 1.5,
//               borderRadius: 3,
//               textTransform: 'none',
//               fontWeight: 600,
//               fontSize: '1rem'
//             }}
//           >
//             Continue Shopping
//           </Button>
//         </Paper>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Header */}
//       <Box sx={{ mb: 4 }}>
//         <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
//           <IconButton onClick={() => navigate(-1)} size="large">
//             <ArrowBack />
//           </IconButton>
//           <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
//             Shopping Cart
//           </Typography>
//           <Badge badgeContent={cartItems.length} color="primary">
//             <ShoppingBag />
//           </Badge>
//         </Stack>
//         <Typography variant="body1" color="text.secondary">
//           {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
//         </Typography>
//       </Box>

//       <Grid container spacing={4}>
//         {/* Cart Items */}
//         <Grid item xs={12} md={8}>
//           <Stack spacing={3}>
//             {cartItems.map((item, index) => (
//               <Fade in timeout={300 + index * 100} key={item._id}>
//                 <Card
//                   elevation={0}
//                   sx={{
//                     border: '1px solid',
//                     borderColor: 'divider',
//                     borderRadius: 3,
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       boxShadow: 3,
//                       transform: 'translateY(-2px)'
//                     }
//                   }}
//                 >
//                   <CardContent sx={{ p: 3 }}>
//                     <Grid container spacing={3} alignItems="center">
//                       {/* Book Image */}
//                       <Grid item xs={12} sm={3}>
//                         <CardMedia
//                           component="img"
//                           image={item.images?.[0] || '/placeholder-book.jpg'}
//                           alt={item.title}
//                           sx={{
//                             width: '100%',
//                             height: 120,
//                             objectFit: 'cover',
//                             borderRadius: 2,
//                             border: '1px solid',
//                             borderColor: 'grey.200'
//                           }}
//                         />
//                       </Grid>

//                       {/* Book Details */}
//                       <Grid item xs={12} sm={5}>
//                         <Typography
//                           variant="h6"
//                           sx={{
//                             fontWeight: 600,
//                             mb: 1,
//                             display: '-webkit-box',
//                             WebkitLineClamp: 2,
//                             WebkitBoxOrient: 'vertical',
//                             overflow: 'hidden'
//                           }}
//                         >
//                           {item.title}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                           by {item.author}
//                         </Typography>
//                         <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
//                           <Chip
//                             label={item.condition}
//                             size="small"
//                             color="primary"
//                             variant="outlined"
//                           />
//                           <Chip
//                             label={item.category}
//                             size="small"
//                             color="secondary"
//                             variant="outlined"
//                           />
//                         </Stack>
//                         <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
//                           <Verified sx={{ fontSize: 16, mr: 0.5 }} />
//                           In Stock
//                         </Typography>
//                       </Grid>

//                       {/* Quantity and Price */}
//                       <Grid item xs={12} sm={4}>
//                         <Stack spacing={2} alignItems="flex-end">

//                           {/* Price */}
//                           <Box sx={{ textAlign: 'right' }}>
//                             <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
//                               ₹{(item.price).toLocaleString()}
//                             </Typography>
//                           </Box>

//                           {/* Remove Button */}
//                           <IconButton
//                             size="small"
//                             onClick={() => handleRemoveItem(item._id)}
//                             sx={{
//                               color: 'error.main',
//                               '&:hover': { bgcolor: 'error.50' }
//                             }}
//                           >
//                             <Delete fontSize="small" />
//                           </IconButton>
//                         </Stack>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             ))}

//             {/* Clear Cart Button */}
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 startIcon={<Delete />}
//                 onClick={() => dispatch(clearCart())}
//                 sx={{ textTransform: 'none' }}
//               >
//                 Clear Cart
//               </Button>
//             </Box>
//           </Stack>
//         </Grid>

//         {/* Order Summary */}
//         <Grid item xs={12} md={4}>
//           <Stack spacing={3}>
//             {/* Order Summary */}
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 border: '1px solid',
//                 borderColor: 'divider'
//               }}
//             >
//               <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
//                 Order Summary
//               </Typography>

//               <Stack spacing={2}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="body1">Subtotal ({cartItems.length} items)</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                     ₹{subtotal.toLocaleString()}
//                   </Typography>
//                 </Box>

//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="body1">Shipping</Typography>
//                   <Typography
//                     variant="body1"
//                     sx={{
//                       fontWeight: 600,
//                       color: shipping === 0 ? 'success.main' : 'text.primary'
//                     }}
//                   >
//                     {shipping === 0 ? 'FREE' : `₹${shipping}`}
//                   </Typography>
//                 </Box>

//                 {discount > 0 && (
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography variant="body1" color="success.main">
//                       Discount ({discount}%)
//                     </Typography>
//                     <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
//                       -₹{discountAmount.toFixed(2)}
//                     </Typography>
//                   </Box>
//                 )}

//                 <Divider />

//                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                     Total
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
//                     ₹{total.toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Stack>

//               {/* Checkout Button */}
//               <Button
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 startIcon={<ShoppingCartCheckout />}
//                 onClick={handleCheckout}
//                 sx={{
//                   mt: 3,
//                   py: 1.5,
//                   borderRadius: 3,
//                   textTransform: 'none',
//                   fontWeight: 600,
//                   fontSize: '1.1rem',
//                   background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
//                   boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
//                 }}
//               >
//                 Proceed to Checkout
//               </Button>

//               {/* Security Features */}
//               <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
//                   <Security sx={{ fontSize: 16, mr: 0.5 }} />
//                   <Typography variant="caption">Secure</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
//                   <LocalShipping sx={{ fontSize: 16, mr: 0.5 }} />
//                   <Typography variant="caption">Fast Delivery</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
//                   <CreditCard sx={{ fontSize: 16, mr: 0.5 }} />
//                   <Typography variant="caption">Easy Payment</Typography>
//                 </Box>
//               </Stack>
//             </Paper>

//             {/* Free Shipping Banner */}
//             {subtotal < 500 && (
//               <Alert severity="info" sx={{ borderRadius: 2 }}>
//                 <AlertTitle>Almost there!</AlertTitle>
//                 Add ₹{(500 - subtotal).toLocaleString()} more to get FREE shipping!
//               </Alert>
//             )}
//           </Stack>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default CartPage;



import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Chip,
  Badge,
  Alert,
  AlertTitle,
  Skeleton,
  Fade
} from '@mui/material';
import {
  Delete,
  ShoppingCartCheckout,
  LocalShipping,
  Security,
  Verified,
  ShoppingBag,
  ArrowBack,
  CreditCard
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems, removeFromCart, clearCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookItems = res.data.items.map((i) => i.productId);
        dispatch(setCartItems(bookItems));
      } catch (err) {
        console.error('Failed to load cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping - discountAmount;

  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(removeFromCart(itemId));
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
    }
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.delete('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(clearCart());
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{xs:12, md:8}} >
            {[1, 2, 3].map((item) => (
              <Card key={item} sx={{ mb: 3, p: 2 }}>
                <Stack direction="row" spacing={3}>
                  <Skeleton variant="rectangular" width={100} height={120} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton variant="text" width="40%" height={24} />
                    <Skeleton variant="text" width="30%" height={24} />
                  </Box>
                </Stack>
              </Card>
            ))}
          </Grid>
          <Grid  size={{xs:12, md:4}} >
            <Skeleton variant="rectangular" height={300} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Paper elevation={0} sx={{ p: 6, borderRadius: 4, background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', border: '1px solid', borderColor: 'divider' }}>
          <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
            Looks like you haven't added any books to your cart yet.
          </Typography>
          <Button variant="contained" size="large" startIcon={<ArrowBack />} onClick={() => navigate('/books')} sx={{ px: 4, py: 1.5, borderRadius: 3, textTransform: 'none', fontWeight: 600, fontSize: '1rem' }}>
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} size="large">
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Shopping Cart
          </Typography>
          <Badge badgeContent={cartItems.length} color="primary">
            <ShoppingBag />
          </Badge>
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{xs:12, md:8}} >
          <Stack spacing={3}>
            {cartItems.map((item, index) => (
              <Fade in timeout={300 + index * 100} key={item._id}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, transition: 'all 0.3s ease', '&:hover': { boxShadow: 3, transform: 'translateY(-2px)' } }}>
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid size={{xs:12, md:3}} >
                        <CardMedia component="img" image={item.images?.[0] || '/placeholder-book.jpg'} alt={item.title} sx={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }} />
                      </Grid>
                      <Grid size={{xs:12, md:5}} >
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>by {item.author}</Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                          <Chip label={item.condition} size="small" color="primary" variant="outlined" />
                          <Chip label={item.category} size="small" color="secondary" variant="outlined" />
                        </Stack>
                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                          <Verified sx={{ fontSize: 16, mr: 0.5 }} /> In Stock
                        </Typography>
                      </Grid>
                      <Grid size={{xs:12, md:4}} >
                        <Stack spacing={2} alignItems="flex-end">
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                              ₹{(item.price)?.toLocaleString()}
                            </Typography>
                          </Box>
                          <IconButton size="small" onClick={() => handleRemoveItem(item._id)} sx={{ color: 'error.main', '&:hover': { bgcolor: 'error.50' } }}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Fade>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleClearCart} sx={{ textTransform: 'none' }}>
                Clear Cart
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid size={{xs:12, md:4}} >
          <Stack spacing={3}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Order Summary
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Subtotal ({cartItems.length} items)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ₹{subtotal.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: shipping === 0 ? 'success.main' : 'text.primary' }}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </Typography>
                </Box>
                {discount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" color="success.main">Discount ({discount}%)</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                      -₹{discountAmount.toFixed(2)}
                    </Typography>
                  </Box>
                )}
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ₹{total.toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
              <Button variant="contained" size="large" fullWidth startIcon={<ShoppingCartCheckout />} onClick={handleCheckout} sx={{ mt: 3, py: 1.5, borderRadius: 3, textTransform: 'none', fontWeight: 600, fontSize: '1.1rem', background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)' }}>
                Proceed to Checkout
              </Button>
              <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <Security sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption">Secure</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <LocalShipping sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption">Fast Delivery</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <CreditCard sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption">Easy Payment</Typography>
                </Box>
              </Stack>
            </Paper>
            {subtotal < 500 && (
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                <AlertTitle>Almost there!</AlertTitle>
                Add ₹{(500 - subtotal).toLocaleString()} more to get FREE shipping!
              </Alert>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;