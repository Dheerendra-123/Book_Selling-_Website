// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
// import Chip from '@mui/material/Chip'
// import Container from '@mui/material/Container'
// import Grid from '@mui/material/Grid'
// import Stack from '@mui/material/Stack'
// import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button'
// import CardActions from '@mui/material/CardActions'
// import { useNavigate, useParams } from 'react-router-dom'
// import DiscountIcon from '@mui/icons-material/Discount';
// import { useEffect, useState } from 'react'
// import { api } from '../api/api'
// const Books = () => {




//   const navigate = useNavigate();



//   const previewHandle = (bookID) => {
//     navigate(`/book/${bookID}`);
//   }

//   const detailsHandle = (bookID) => {
//     navigate(`/view-details/${bookID}`);
//   }

//   const category = ["All", "Science", "Fanatsy", "Adventure", "Novel", "Competition", "Story"];

//   const [bookData, setBookData] = useState([]);

//   const getAllBooks = async () => {
//     try {
//       const response = await api.get('/api/books', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setBookData(response.data.getAllBooks);

//     } catch (error) {
//       console.error("Failed to fetch books:", error);
//     }

//   };




//   useEffect(() => {
//     getAllBooks();
//   }, [])
//   useEffect(() => {
//     console.log(bookData);
//   }, [bookData]);

//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: 'lightgray',
//           width: '100%',
//           height: '20px',
//         }}
//       >
//       </Box>
//       <Container maxWidth={false} sx={{ maxWidth: '96%', mb: '20px' }}>


//         <Box mt={2}>
//           <Typography variant='h5' color='text.secondary' fontWeight={700}>
//             Latest Books
//           </Typography>
//           <Grid container spacing={2} pt={1}>
//             {bookData.map((book, index) => (
//               <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
//                  <Box sx={{position:'relative',top:'40px',left:'7px'}}>
//                     <Chip label={book.isOrdered?"Not Avialable":"Available"} variant='outlined' size='medium' color={book.isOrdered?'error':'success'}  sx={{background:'white'}}></Chip>
//                   </Box>
//                 <Card>
                 
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={book.images && book.images.length > 0 ? book.images[0] : ''}
//                     alt={book.title}

//                   />

//                   <CardContent>
//                     <Typography variant="h6">
//                       {book.title.length > 14 ? `${book.title.slice(0, 18)}...` : book.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Author: {book.author}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Edition: {book.edition}
//                     </Typography>
//                     <Stack direction='row' gap={1} mt={1}>
//                       <Typography
//                         variant="body1"
//                         sx={{
//                           textDecoration: 'line-through',
//                           color: 'gray',
//                           fontWeight: 500,
//                         }}
//                       >
//                         ₹{book.originalPrice}
//                       </Typography>

//                       {/* New Price */}
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           color: 'black',
//                           fontWeight: 'bold',
//                           fontSize: '1.2rem',
//                         }}
//                       >
//                         ₹{book.price}
//                       </Typography>

//                       {/* Discount Chip */}
//                       <Chip
//                         icon={<DiscountIcon />}
//                         size='small'
//                         label={`${Math.round((1 - book.price / book.originalPrice) * 100)}% OFF`}
//                         color="success"
//                         variant='outlined'
//                         sx={{
//                           fontWeight: 'bold',
//                         }}
//                       />
//                     </Stack>
//                   </CardContent>

//                   <CardActions>
//                     <Button size="small" variant='outlined' onClick={() => previewHandle(book._id)}>Preview</Button>
//                     <Button size="small" variant='outlined' onClick={() => detailsHandle(book._id)}>View Details</Button>
//                   </CardActions>

//                 </Card>

//               </Grid>

//             ))}
//           </Grid>
//         </Box>
//       </Container>
//     </>


//   )
// }

// export default Books


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
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Slider from '@mui/material/Slider'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import ClearIcon from '@mui/icons-material/Clear'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useNavigate, useParams } from 'react-router-dom'
import DiscountIcon from '@mui/icons-material/Discount';
import { useEffect, useState } from 'react'
import { api } from '../api/api'

const Books = () => {
  const navigate = useNavigate();

  const previewHandle = (bookID) => {
    navigate(`/book/${bookID}`);
  }

  const detailsHandle = (bookID) => {
    navigate(`/view-details/${bookID}`);
  }

  const category = ["All", "Science", "Fantasy", "Adventure", "Novel", "Competition", "Story"];

  const [bookData, setBookData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minDiscount, setMinDiscount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000);

  const getAllBooks = async () => {
    try {
      const response = await api.get('/api/books', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBookData(response.data.getAllBooks);
      
      // Calculate max price for slider
      if (response.data.getAllBooks.length > 0) {
        const max = Math.max(...response.data.getAllBooks.map(book => book.price));
        setMaxPrice(max);
        setPriceRange([0, max]);
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  // Filter function
  const filterBooks = () => {
    let filtered = [...bookData];

    // Search by title
    if (searchQuery.trim()) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(book => 
        book.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price range
    filtered = filtered.filter(book => 
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    // Filter by minimum discount
    if (minDiscount > 0) {
      filtered = filtered.filter(book => {
        const discount = Math.round((1 - book.price / book.originalPrice) * 100);
        return discount >= minDiscount;
      });
    }

    setFilteredBooks(filtered);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([0, maxPrice]);
    setMinDiscount(0);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [bookData, searchQuery, selectedCategory, priceRange, minDiscount]);

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
        
        {/* Search Bar */}
        <Box mt={2} mb={3}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mb={2}>
            <TextField
              placeholder="Search books by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchQuery('')}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                width: { xs: '100%', sm: '400px', md: '500px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              endIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={() => setShowFilters(!showFilters)}
              sx={{ 
                minWidth: 120,
                borderRadius: 2,
              }}
            >
              Filters
            </Button>
          </Stack>

          {/* Filter Section */}
          <Collapse in={showFilters}>
            <Box sx={{ mt: 3, mb: 2 }}>
              <Grid container spacing={3} alignItems="center">
                {/* Category Filter */}
                <Grid size ={{xs:12 ,sm:6 ,md:3}}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={selectedCategory}
                      label="Category"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      {category.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Price Range Filter */}
                <Grid size ={{xs:12 ,sm:6 ,md:4}}>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </Typography>
                  <Slider
                    value={priceRange}
                    onChange={(e, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={maxPrice}
                    step={50}
                    valueLabelFormat={(value) => `₹${value}`}
                    sx={{ color: 'primary.main' }}
                  />
                </Grid>

                {/* Discount Filter */}
                <Grid size ={{xs:12 ,sm:6 ,md:3}}>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    Minimum Discount: {minDiscount}%
                  </Typography>
                  <Slider
                    value={minDiscount}
                    onChange={(e, newValue) => setMinDiscount(newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={80}
                    step={5}
                    valueLabelFormat={(value) => `${value}%`}
                    sx={{ color: 'success.main' }}
                  />
                </Grid>

                {/* Clear Filters */}
                <Grid size ={{xs:12 ,sm:6 ,md:2}}>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={clearFilters}
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Clear All
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Collapse>

          {/* Results Summary */}
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </Typography>
          </Box>
        </Box>

        <Box mt={2}>
          
          {filteredBooks.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                No books found matching your criteria
              </Typography>
              <Button 
                variant="outlined" 
                onClick={clearFilters} 
                sx={{ mt: 2 }}
              >
                Clear Filters
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2} pt={1}>
              {filteredBooks.map((book, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
                  <Box sx={{position:'relative',top:'40px',left:'7px'}}>
                    <Chip 
                      label={book.isOrdered?"Not Available":"Available"} 
                      variant='outlined' 
                      size='medium' 
                      color={book.isOrdered?'error':'success'}  
                      sx={{background:'white'}}
                    />
                  </Box>
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

                    <CardActions>
                      <Button size="small" variant='outlined' onClick={() => previewHandle(book._id)}>Preview</Button>
                      <Button size="small" variant='outlined' onClick={() => detailsHandle(book._id)}>View Details</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  )
}

export default Books