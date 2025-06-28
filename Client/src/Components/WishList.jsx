import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { handleError, handleSuccess } from '../Utils/Tostify';
import DiscountIcon from '@mui/icons-material/Discount';
import { removeFromWishList, setWishList } from '../../redux/wishListSlice';
import { useDispatch, useSelector } from 'react-redux';
import useMobile from '../../hooks/useMobile';

const WishList = () => {
  const wishList = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const isMobile = useMobile();
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(true);

  const getWishList = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setWishList(res.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      const res = await api.delete('/api/wishlist/remove', {
        headers: { Authorization: `Bearer ${token}` },
        data: { bookId },
      });

      if (res.data.success) {
        handleSuccess(res.data.message);
        dispatch(removeFromWishList(bookId));
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        color="primary"
        textAlign="center"
      >
        WishList
      </Typography>

      {/* Loading Spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress color="primary" />
        </Box>
      ) : wishList.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" color="text.secondary">
            Your wishlist is empty.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} mt={5} justifyContent={isMobile ? 'center' : false}>
          {wishList.map((book, index) => (
            <Grid size={{ xs: 12, sm: 4, md: 3, lg: 3 }} key={index}>
              <Box position="relative">
                <IconButton
                  onClick={() => handleDelete(book._id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    backgroundColor: 'white',
                    boxShadow: 1,
                    '&:hover': {
                      backgroundColor: 'grey.100',
                    },
                  }}
                >
                  <Delete color="error" />
                </IconButton>

                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      book.images && book.images.length > 0
                        ? book.images[0]
                        : '/placeholder-book.jpg'
                    }
                    alt={book.title}
                  />

                  <CardContent>
                    <Typography variant="h6">
                      {book.title.length > 27
                        ? `${book.title.slice(0, 24)}...`
                        : book.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Author: {book.author}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Edition: {book.edition}
                    </Typography>

                    <Stack
                      direction="row"
                      gap={1}
                      mt={1}
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          textDecoration: 'line-through',
                          color: 'gray',
                          fontWeight: 500,
                        }}
                      >
                        ₹{book.originalPrice}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                        }}
                      >
                        ₹{book.price}
                      </Typography>

                      <Chip
                        icon={<DiscountIcon />}
                        size="small"
                        label={`${Math.round(
                          (1 - book.price / book.originalPrice) * 100
                        )}% OFF`}
                        color="success"
                        variant="outlined"
                        sx={{
                          fontWeight: 'bold',
                        }}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishList;
