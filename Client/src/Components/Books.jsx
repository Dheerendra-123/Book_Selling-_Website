import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import img from '../assets/img.png'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useNavigate } from 'react-router-dom'

const Books = () => {

  const category = ['Novel', 'Fantasy', 'Mathematics', 'Science', 'Cosmos', 'Encylopedia', 'HighSchool', 'Intermediate']
  const booksInfo = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      edition: "3rd",
      price: "₹250",
      image: img,
    },
    {
      title: "1984",
      author: "George Orwell",
      edition: "2nd",
      price: "₹200",
      image: img,
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      edition: "1st",
      price: "₹300",
      image: img,
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      edition: "4th",
      price: "₹150",
      image: img,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      edition: "3rd",
      price: "₹250",
      image: img,
    },
    {
      title: "1984",
      author: "George Orwell",
      edition: "2nd",
      price: "₹200",
      image: img,
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      edition: "1st",
      price: "₹300",
      image: img,
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      edition: "4th",
      price: "₹150",
      image: img,
    }
  ];

  const navigate=useNavigate();

  const handleClick = (type) => {
    console.log(`clicked on chip ${type}`);
  }

  const previewHandle=()=>{
    navigate('/book-preview');
  }

  const detailsHandle=()=>{
    navigate('/view-details');
  }
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
      <Container maxWidth={false} sx={{ maxWidth: '96%',mb:'20px' }}>
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
            {booksInfo.map((book, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={book.image}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Edition: {book.edition}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Price: {book.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant='outlined' onClick={previewHandle}>Preview</Button>
                    <Button size="small" variant='outlined' onClick={detailsHandle}>View Details</Button>
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