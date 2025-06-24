import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import { CheckCircle, HourglassEmpty } from '@mui/icons-material';
import img from '../assets/img.png'

const BooksListed = () => {

    const booksListed = [
      {
        _id: '1',
        title: 'Harry Potter and the Goblet of Fire',
        author: 'J.K. Rowling',
        edition: '4th',
        image: img,
        price: 499,
        quantity: 1,
        status: 'Delivered',
        purchaseDate: '2025-06-10T00:00:00Z',
      },
      {
        _id: '2',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        edition: '1st',
        image: img,
        price: 699,
        quantity: 1,
        status: 'Pending',
        purchaseDate: img,
      },
      {
        _id: '3',
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        edition: '2nd',
        image: img,
        price: 799,
        quantity: 1,
        status: 'Delivered',
        purchaseDate: '2025-06-18T00:00:00Z',
      },
    ];
    
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={700} color="text.secondary" textAlign="center" gutterBottom>
        Books Listed
      </Typography>

      <Grid container spacing={3} mt={3}>
        {booksListed.map((book, index) => (
          <Grid size={{xs:12, sm:4 ,md:2.7 }}    key={book._id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="160"
                image={book.image}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {book.title.length > 18 ? `${book.title.slice(0, 18)}...` : book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Edition: {book.edition}
                </Typography>

                  <Typography variant="body1" fontWeight="bold">
                    ₹{book.price}
                  </Typography>              

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BooksListed