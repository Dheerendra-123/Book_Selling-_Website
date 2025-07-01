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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

import DiscountIcon from '@mui/icons-material/Discount';
import { Delete } from '@mui/icons-material';
import { handleError, handleSuccess } from '../Utils/Tostify';

const BooksListed = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

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



  const confirmDelete = (bookId) => {
    setSelectedBookId(bookId);
    setOpenDialog(true);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setSelectedBookId(null);
  };

  const proceedToDelete = async () => {
    setOpenDialog(false);
    if (!selectedBookId) return;

    try {
      const res = await api.delete('/api/bookslisted/remove', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { bookId: selectedBookId },
      });

      if (res.data.success) {
        handleSuccess(res.data.message);
        setBookData((prevBooks) =>
          prevBooks.filter((book) => book._id !== selectedBookId)
        );
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    } finally {
      setSelectedBookId(null);
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
            <Grid  item xs={12} sm={4} md={3} lg={3}  key={index}>
              <IconButton
                 onClick={() => confirmDelete(book._id)}
                sx={{
                  position: 'relative',
                  top: 45,
                  left: 5,
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
                    {book.title.length > 21
                      ? `${book.title.slice(0, 21)}...`
                      : book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author:   {book.author.length > 17
                      ? `${book.author.slice(0, 17)}...`
                      : book.author}
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
           <Dialog
        open={openDialog}
        onClose={cancelDelete}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Are you sure you want to delete this book from your listing? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="success" variant='outlined'  autoFocus>
            Cancel
          </Button>
          <Button onClick={proceedToDelete} color="error" variant="outlined" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BooksListed;
