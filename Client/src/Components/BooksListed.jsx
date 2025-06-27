import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import DiscountIcon from '@mui/icons-material/Discount';
import { useEffect, useState } from 'react'
import { api } from '../api/api'
const BooksListed = () => {

  const [bookData, setBookData] = useState([]);

  const getAllBooks = async () => {
    try {
      const response = await api.get('/api/books', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBookData(response.data.getAllBooks);

    } catch (error) {
      console.error("Failed to fetch books:", error);
    }

  };




  useEffect(() => {
    getAllBooks();
  }, [])
  useEffect(() => {
    console.log(bookData);
  }, [bookData]);

  return (
   
        <Box mt={2}>
          <Grid container spacing={2} pt={3}>
            {bookData.map((book, index) => (
              <Grid size={{ xs: 12, sm: 5, md: 2.5 }} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={book.images && book.images.length > 0 ? book.images[0] : ''}
                    alt={book.title}

                  />

                  <CardContent>
                    <Typography variant="h6">
                      {book.title.length > 14 ? `${book.title.slice(0, 18)}...` : book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Edition: {book.edition}
                    </Typography>
                    <Stack direction='row' gap={1} mt={1}>
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

                      {/* New Price */}
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

                      {/* Discount Chip */}
                      <Chip
                        icon={<DiscountIcon />}
                        size='small'
                        label={`${Math.round((1 - book.price / book.originalPrice) * 100)}% OFF`}
                        color="success"
                        variant='outlined'
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
        </Box>


  )
}

export default BooksListed ;
