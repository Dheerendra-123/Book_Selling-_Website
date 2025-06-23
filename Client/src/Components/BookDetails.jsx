import {
  Box,
  Typography,
  Chip,
  Grid,
  Card,
  Paper,
  Stack,
  Button,
  Avatar,
  IconButton,
  Tooltip,
  Container,
  Badge
} from '@mui/material';
import {
  Person,
  Category,
  LibraryBooks,
  Info,
  ShoppingCart,
  Bookmark,
  Share,
  Star,
  MenuBook,
  ContactMail,
  Place
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { handleError, handleSuccess } from '../Utils/Tostify';
import { setCartItems } from '../../redux/cartSlice';
import DiscountIcon from '@mui/icons-material/Discount';

const BookDetails = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);


const handleAddToCart = async () => {
  try {
    if (!bookData || !bookData._id) {
      handleError('Book data not available');
      return;
    }

    const alreadyInCart = cartItems.find(item => item._id === bookData._id);
    if (alreadyInCart) {
      handleError('Item is already in cart');
    } else {
      const token = localStorage.getItem('token');
      const res = await api.post('/api/cart', bookData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Convert backend response to expected Redux format
      const updatedItems = res.data.items.map(i => i.productId); // populated BookForm
      dispatch(setCartItems(updatedItems));
      handleSuccess('Item added to cart');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    handleError('Failed to add item to cart');
  }
};


const handleAddToWishList=async()=>{
    try{
      const token = localStorage.getItem('token');
      const res=await api.post('/api/wishlist/add',{ bookId: bookData._id },{
          headers:{Authorization:`Bearer ${token}`}
      })
      console.log(res.data);
      handleSuccess(res.data.message)
    }catch(error){
      console.log(error);
    }
}


  const getBook = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/books/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBookData(response.data.bookData);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(bookData._id)
  useEffect(() => {
    getBook();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const discountPercentage = bookData.originalPrice
    ? Math.round(((bookData.originalPrice - bookData.price) / bookData.originalPrice) * 100)
    : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Main Book Information Card */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
        }}
      >
        <Grid container spacing={4}>
          {/* Book Image Placeholder */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component="img"
              src={bookData.images[0]}
              alt="Book Image"
              sx={{
                width: 300,
                height: 400,
                objectFit: 'cover',
                borderRadius: 2,
                border: '2px dashed',
                borderColor: 'grey.300',
                overflow: 'hidden'
              }}
            >
            </Box>
          </Grid>


          {/* Book Details */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Header with actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    lineHeight: 1.2,
                    mb: 1
                  }}
                >
                  {bookData.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    by {bookData.author}
                  </Typography>
                </Box>
              </Box>

              {/* Action buttons */}
              <Stack direction="row" spacing={1}>
                <Tooltip title="Add to Wishlist">
                  <IconButton size="large" sx={{ bgcolor: 'grey.50' }} onClick={handleAddToWishList}>
                    <Bookmark />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton size="large" sx={{ bgcolor: 'grey.50' }}>
                    <Share />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>

            {/* Book Tags */}
            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label={bookData.condition}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label={bookData.type}
                color="secondary"
                variant="outlined"
                size="small"
              />
              <Chip
                label={bookData.category}
                color="info"
                variant="outlined"
                size="small"
                icon={<Category />}
              />
              <Chip
                label={`${bookData.edition} Edition`}
                color="default"
                variant="outlined"
                size="small"
                icon={<LibraryBooks />}
              />
            </Stack>

            {/* Pricing */}
            <Box sx={{
              p: 3,
              bgcolor: 'primary.50',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'primary.100',
              mb: 3
            }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                    ₹{bookData.price}
                  </Typography>
                  {bookData.originalPrice && (
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ₹{bookData.originalPrice}
                    </Typography>
                  )}
                </Box>

                {discountPercentage > 0 && (
                  <Chip icon={<DiscountIcon />} variant='outlined' size='small' color='success' label={`${discountPercentage}% off`} sx={{p:'3px'}}></Chip>
                )}
              </Stack>
            </Box>

            {/* Availability and Actions */}
            <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Info sx={{
                  mr: 1,
                  color: bookData.isSold ? 'error.main' : 'success.main',
                  fontSize: 20
                }} />
                <Chip
                  label={bookData.isSold ? "SOLD OUT" : "AVAILABLE"}
                  color={bookData.isSold ? "error" : "success"}
                  variant="outlined"
                  size="medium"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              {!bookData.isSold && (
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<ShoppingCart />}
                  sx={{
                    px: 2,
                    py: 1,
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '0.8rem'
                  }}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              )}
            </Stack>

            {/* ISBN */}
            <Box sx={{
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'grey.200'
            }}>
              <Typography variant="body2" color="text.secondary">
                <strong>ISBN:</strong> {bookData.isbn}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Description Section */}
      {bookData.description && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 3,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <MenuBook sx={{ mr: 2, color: 'primary.main' }} />
            Description
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
              fontSize: '1.1rem'
            }}
          >
            {bookData.description}
          </Typography>
        </Paper>
      )}

      {/* Seller Information */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 3,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Person sx={{ mr: 2, color: 'primary.main' }} />
          Seller Information
        </Typography>

        <Grid container spacing={3}>
          {/* Seller Profile */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'primary.main',
                    fontSize: '1.5rem',
                    fontWeight: 700
                  }}
                >
                  {bookData.sellerName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {bookData.sellerName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Book Seller
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Star sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      4.8 (124 reviews)
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ContactMail sx={{ mr: 2, color: 'text.secondary' }} />
                <Typography variant="body1" color="text.primary">
                  {bookData.email}
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Location */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Place sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Location
                </Typography>
              </Box>

              <Stack spacing={1}>
                <Box>
                  <Typography variant="h6" color="text.primary" >
                    PIN Code
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {bookData.pinCode}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6" color="text.primary" >
                    City & State
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
                    {bookData.city}, {bookData.state}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookDetails;