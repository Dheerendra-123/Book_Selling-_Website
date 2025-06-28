import { useEffect, useState } from 'react';
import { api } from '../api/api';
import useMobile from '../../hooks/useMobile';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';

import DiscountIcon from '@mui/icons-material/Discount';

const BooksListed = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);

  const isMobile = useMobile();

  const getAllBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/books/listed', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookData(response.data.books);

    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
    
  }, []);

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        color="primary"
        textAlign="center"
      >
        Books Listed
      </Typography>

      {/* Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress color="primary" />
        </Box>
      ) : bookData.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" color="text.secondary">
            No books listed yet by You.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} pt={3} justifyContent={isMobile ? 'center' : false}>
          {bookData.map((book, index) => (
            <Grid size={{xs:12,sm:5,md:2.5}} key={index}>
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

                  <Stack direction="row" gap={1} mt={1}>
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
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BooksListed;
