import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useNavigate, useParams } from 'react-router-dom'
import DiscountIcon from '@mui/icons-material/Discount';
import { useEffect, useState } from 'react'
import { api } from '../api/api'
const Books = () => {

  const category = ['Novel', 'Fantasy', 'Mathematics', 'Science', 'Cosmos', 'Encylopedia', 'HighSchool', 'Intermediate']


  const navigate = useNavigate();

  const handleClick = (type) => {
    console.log(`clicked on chip ${type}`);
  }

  const previewHandle = (bookID) => {
    navigate(`/book/${bookID}`);
  }

  const detailsHandle = (bookID) => {
    navigate(`/view-details/${bookID}`);
  }
  const originalPrice = 200;
  const newPrice = 100;
  const discount = ((originalPrice - newPrice) / originalPrice) * 100;


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
    <>
      <Box
        sx={{
          backgroundColor: 'lightgray',
          width: '100%',
          height: '20px',
        }}
      >
      </Box>
      <Container maxWidth={false} sx={{ maxWidth: '96%', mb: '20px' }}>
        <Box >
          <Stack direction='row' gap={1} mt={3}>
            {
              category.map((type, index) => (
                <Chip key={index} label={type} variant='outlined' color="primary" onClick={() => handleClick(type)} />
              ))
            }
          </Stack>
        </Box>


        <Box >
          <Grid container spacing={2} pt={3}>
            {bookData.map((book, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
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
                        ₹{originalPrice}
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
                        ₹{newPrice}
                      </Typography>

                      {/* Discount Chip */}
                      <Chip
                        icon={<DiscountIcon />}
                        size='small'
                        label={`${Math.round(discount)}% OFF`}
                        color="success"
                        variant='outlined'
                        sx={{
                          fontWeight: 'bold',
                        }}
                      />
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant='outlined' onClick={() => previewHandle(book._id)}>Preview</Button>
                    <Button size="small" variant='outlined' onClick={() => detailsHandle(book._id)}>View Details</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>


  )
}

export default Books