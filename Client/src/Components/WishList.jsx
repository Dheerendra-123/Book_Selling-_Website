import React, { useEffect, useState } from 'react'
import { api } from '../api/api';
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { handleError, handleSuccess } from '../Utils/Tostify';
import DiscountIcon from '@mui/icons-material/Discount';

const WishList = () => {
    const token = localStorage.getItem('token');
    const [wishList, setWishList] = useState([]);
    const getWishList = async () => {

        try {

            const res = await api.get('api/wishlist', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setWishList(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(wishList)
    useEffect(() => {
        getWishList();
    }, [])

    const handleDelete = async (bookId) => {
        console.log(bookId);
        try {
            const res = await api.delete('/api/wishlist/remove', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { bookId }
            });

            if (res.data.success) {
                handleSuccess(res.data.message)
                setWishList(prev => prev.filter(book => book._id !== bookId));
            }

            console.log(res.data);
        } catch (error) {
            console.log(error);
            handleError(error);
        }


    }

    return (
  <Box>
  <Box>
    <Typography
      variant="h4"
      fontWeight={700}
      color="text.secondary"
      textAlign="center"
      gutterBottom
    >
      WishList
    </Typography>
  </Box>

  <Grid container spacing={2}  mt={3}>
    {wishList.map((book, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        {/* Wrapper Box for relative positioning */}
        <Box position="relative">
          {/* Delete Icon Positioned Top-Right */}
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
                {book.title.length > 18
                  ? `${book.title.slice(0, 18)}...`
                  : book.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Author: {book.author}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Edition: {book.edition}
              </Typography>

              <Stack direction="row" gap={1} mt={1} alignItems="center" flexWrap="wrap">
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
</Box>


    );
}

export default WishList