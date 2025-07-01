
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
  Skeleton,
  Fade,
  Alert,
  Tooltip
} from '@mui/material';
import {
  Delete,
  ShoppingCartCheckout,
  LocalShipping,
  Verified,
  ShoppingBag,
  ArrowBack,
  Clear,
  InfoOutlined
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems, removeFromCart, clearCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { handleError, handleSuccess } from '../Utils/Tostify';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const [removingItems, setRemovingItems] = useState(new Set());

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
  const total = subtotal + shipping;

  const handleRemoveItem = async (itemId) => {
    setRemovingItems(prev => new Set(prev).add(itemId));
    try {
      const token = localStorage.getItem('token');
      const res = await api.delete(`api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId: itemId }
      });
      dispatch(removeFromCart(itemId));
      handleSuccess('Item removed from cart');
    } catch (err) {
      handleError(err?.response?.data?.message || 'Error removing item');
      console.error('Failed to remove item from cart:', err);
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.delete('api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(clearCart());
      handleSuccess("Cart cleared successfully");
    } catch (err) {
      handleError('Failed to clear cart');
      console.error('Failed to clear cart:', err);
    }
  };

  const handleCheckout = () => {
    const itemIds = cartItems.map(item => item._id);
    console.log("Proceeding to checkout with item IDs:", itemIds);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={300} height={24} sx={{ mt: 1 }} />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {[1, 2, 3].map((item) => (
              <Card key={item} sx={{ mb: 2, p: 2 }}>
                <Stack direction="row" spacing={2}>
                  <Skeleton variant="rectangular" width={80} height={100} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" height={24} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="text" width="30%" height={20} />
                  </Box>
                  <Skeleton variant="text" width={80} height={24} />
                </Stack>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} lg={4}>
            <Skeleton variant="rectangular" height={250} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ textAlign: 'center' }}>
          <ShoppingBag 
            sx={{ 
              fontSize: { xs: 60, md: 80 }, 
              color: 'text.disabled', 
              mb: 2 
            }} 
          />
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              mb: 1, 
              fontSize: { xs: '1.5rem', md: '2rem' } 
            }}
          >
            Your cart is empty
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}
          >
            Discover amazing books and add them to your cart to get started.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/books')}
            sx={{ 
              px: 4, 
              py: 1.5, 
              textTransform: 'none', 
              fontWeight: 500,
              borderRadius: 2
            }}
          >
            Browse Books
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 1, 
            fontSize: { xs: '1.75rem', md: '2.125rem' } 
          }}
        >
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={2}>
            {/* Clear Cart Button */}
            {cartItems.length > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<Clear />}
                  onClick={handleClearCart}
                  sx={{ textTransform: 'none' }}
                >
                  Clear Cart
                </Button>
              </Box>
            )}

            {cartItems.map((item, index) => (
              <Fade in timeout={200 + index * 50} key={item._id}>
                <Card 
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 2,
                    opacity: removingItems.has(item._id) ? 0.5 : 1,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={2} 
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                  >
                    {/* Book Image */}
                    <CardMedia
                      component="img"
                      image={item.images?.[0] || '/placeholder-book.jpg'}
                      alt={item.title}
                      sx={{ 
                        width: { xs: '100%', sm: 80 }, 
                        height: { xs: 200, sm: 100 },
                        borderRadius: 1.5,
                        objectFit: 'cover',
                        maxWidth: { xs: 200, sm: 80 },
                        mx: { xs: 'auto', sm: 0 }
                      }}
                    />

                    {/* Book Details */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          mb: 0.5,
                          fontSize: { xs: '1rem', sm: '1.125rem' },
                          lineHeight: 1.3
                        }}
                        noWrap
                      >
                        {item.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 1 }}
                      >
                        by {item.author}
                      </Typography>
                      
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip 
                          label={item.condition} 
                          size="small" 
                          variant="outlined"
                          color="primary"
                          sx={{ height: 24, fontSize: '0.75rem' }}
                        />
                        <Chip 
                          label={item.category} 
                          size="small" 
                          variant="outlined"
                          color="secondary"
                          sx={{ height: 24, fontSize: '0.75rem' }}
                        />
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Verified sx={{ fontSize: 16, color: 'success.main' }} />
                        <Typography 
                          variant="body2" 
                          color="success.main" 
                          fontWeight={500}
                        >
                          In Stock
                        </Typography>
                      </Stack>
                    </Box>

                    {/* Price and Actions */}
                    <Stack 
                      alignItems={{ xs: 'flex-start', sm: 'flex-end' }} 
                      spacing={1}
                      sx={{ minWidth: 'fit-content' }}
                    >
                      <Typography 
                        variant="h6" 
                        fontWeight={700}
                        color="primary.main"
                        sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                      >
                        ₹{item.price.toLocaleString()}
                      </Typography>
                      
                      <Tooltip title="Remove from cart">
                        <IconButton 
                          onClick={() => handleRemoveItem(item._id)}
                          color="error"
                          size="small"
                          disabled={removingItems.has(item._id)}
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: 'error.main',
                              color: 'white'
                            }
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </Card>
              </Fade>
            ))}
          </Stack>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              position: 'sticky',
              top: 20
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Order Summary
            </Typography>
            
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1">
                  Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  ₹{subtotal.toLocaleString()}
                </Typography>
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography variant="body1">Shipping</Typography>
                  {shipping === 0 && (
                    <Tooltip title="Free shipping on orders above ₹500">
                      <InfoOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
                    </Tooltip>
                  )}
                </Stack>
                <Typography 
                  variant="body1" 
                  fontWeight={600}
                  color={shipping === 0 ? 'success.main' : 'text.primary'}
                >
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </Typography>
              </Box>
              
              {subtotal < 500 && (
                <Alert 
                  severity="info" 
                  sx={{ 
                    fontSize: '0.875rem',
                    '& .MuiAlert-icon': { fontSize: 16 }
                  }}
                >
                  Add ₹{(500 - subtotal).toLocaleString()} more for FREE shipping!
                </Alert>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" fontWeight={700}>
                  Total
                </Typography>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  ₹{total.toLocaleString()}
                </Typography>
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ShoppingCartCheckout />}
                onClick={handleCheckout}
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 2
                }}
              >
                Proceed to Checkout
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate('/books')}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2
                }}
              >
                Continue Shopping
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;