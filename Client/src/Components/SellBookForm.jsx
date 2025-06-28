import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
  Divider,
  Snackbar,
} from '@mui/material';
import {
  PhotoCamera,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { styled } from '@mui/material/styles';
import { api } from '../api/api';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImagePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 150,
  height: 200,
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 5,
  right: 5,
  minWidth: 30,
  width: 30,
  height: 30,
  backgroundColor: theme.palette.error.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const SellBookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    edition: '1st',
    isbn: '',
    category: '',
    type: '',
    condition: '',
    price: '',
    originalPrice: '',
    description: '',
    sellerName: '',
    email: '',
    state: '',
    contact: '',
    whatsapp: '',
    city: '',
    pinCode: '',
  });

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const MAX_IMAGES = 4;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    // Check if adding new files would exceed the limit
    if (images.length + files.length > MAX_IMAGES) {
      setErrors(prev => ({
        ...prev,
        images: `You can only upload a maximum of ${MAX_IMAGES} images. Currently you have ${images.length} image(s).`
      }));
      return;
    }

    // Clear any existing image errors
    if (errors.images) {
      setErrors(prev => ({
        ...prev,
        images: ''
      }));
    }

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        try {
          const options = {
            maxSizeMB: 1, // Compress to under 1 MB
            maxWidthOrHeight: 1024,
            useWebWorker: true
          };

          const compressedFile = await imageCompression(file, options);

          const reader = new FileReader();
          reader.onload = (event) => {
            setImages(prev => {
              // Check again due to async behavior
              if (prev.length >= MAX_IMAGES) {
                return prev;
              }
              return [...prev, {
                file: compressedFile,
                preview: event.target.result,
                id: Date.now() + Math.random()
              }];
            });
          };

          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error('Compression error:', error);
          setErrors(prev => ({
            ...prev,
            images: 'Failed to compress image. Please try a different file.'
          }));
        }
      }
    }
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
    // Clear image error if it exists
    if (errors.images && images.length <= 1) {
      setErrors(prev => ({
        ...prev,
        images: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.type) newErrors.type = 'Book type is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.sellerName.trim()) newErrors.sellerName = 'Seller name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pinCode) newErrors.pinCode = 'PIN code is required';
    if (!formData.contact) newErrors.pinCode = 'Contact is required';
    if (!formData.whatsapp) newErrors.pinCode = 'WhatsApp no. is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    // ISBN validation
    if (formData.isbn) {
      const isbnRegex = /^(\d{10}|\d{13})$/;
      if (!isbnRegex.test(formData.isbn)) {
        newErrors.isbn = 'Enter a valid ISBN (10 or 13 digits)';
      }
    }

    // Price validation
    if (formData.price && (isNaN(formData.price) || parseFloat(formData.price) <= 0)) {
      newErrors.price = 'Enter a valid price';
    }

    // Original price validation
    if (formData.originalPrice && (isNaN(formData.originalPrice) || parseFloat(formData.originalPrice) <= 0)) {
      newErrors.originalPrice = 'Enter a valid original price';
    }

    // PIN code validation
    if (formData.pinCode && (!/^\d{6}$/.test(formData.pinCode))) {
      newErrors.pinCode = 'PIN code must be 6 digits';
    }

    // Image validation
    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    // Description length validation
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitMessage('Please fix the errors above');
      return;
    }

    setLoading(true);
    setSubmitMessage('');

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append images
      images.forEach((image, index) => {
        formDataToSend.append(`images`, image.file);
      });

      // Method 1: Using axios directly with proper config
      const response = await api({
        method: 'post',
        url: '/api/books/sell-form',
        data: formDataToSend,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // console.log(response.data);
      const navigate = useNavigate();
      setSubmitMessage('Book listed successfully!');
      navigate('/books');

      // Reset form
      setFormData({
        title: '',
        author: '',
        edition: '1st',
        isbn: '',
        category: '',
        type: '',
        condition: '',
        price: '',
        originalPrice: '',
        description: '',
        sellerName: '',
        email: '',
        state: '',
        contact:'',
        whatsapp:'',
        city: '',
        pinCode: '',
      });
      setImages([]);
      setErrors({});

    } catch (error) {
      console.error('Submit error:', error);

      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error || 'Server error';

        if (status === 401) {
          setSubmitMessage('Authentication failed. Please log in again.');
        } else if (status === 413) {
          setSubmitMessage('Files too large. Please reduce image sizes.');
        } else if (status === 400) {
          setSubmitMessage(`Invalid data: ${message}`);
        } else {
          setSubmitMessage(`Server error (${status}): ${message}`);
        }
      } else if (error.request) {
        setSubmitMessage('Network error. Please check your connection and try again.');
      } else {
        setSubmitMessage('Error submitting form. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, sm: 4 }, width: '100%' }}>
      <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Sell Your Book
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
          Fill in the details below to list your book for sale
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Book Information Section */}
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>Book Information</Typography>
            <Divider sx={{ mt: 1 }} />
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, sm: 6 }} >
              <TextField fullWidth label="Book Title" name="title" value={formData.title} onChange={handleInputChange} error={!!errors.title} helperText={errors.title} required />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <TextField fullWidth label="Author" name="author" value={formData.author} onChange={handleInputChange} error={!!errors.author} helperText={errors.author} required />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <TextField fullWidth label="Edition" name="edition" value={formData.edition} onChange={handleInputChange} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <TextField fullWidth label="ISBN (Optional)" name="isbn" value={formData.isbn} onChange={handleInputChange} error={!!errors.isbn} helperText={errors.isbn || "10 or 13 digit ISBN number"} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <TextField fullWidth label="Category" name="category" value={formData.category} onChange={handleInputChange} error={!!errors.category} helperText={errors.category} required />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <TextField fullWidth label="Type" name="type" value={formData.type} onChange={handleInputChange} error={!!errors.type} helperText={errors.type} required />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <TextField fullWidth label="Condition" name="condition" value={formData.condition} onChange={handleInputChange} error={!!errors.condition} helperText={errors.condition} required />
            </Grid>
          </Grid>

          {/* Pricing Section */}
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>Pricing</Typography>
            <Divider sx={{ mt: 1 }} />
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, sm: 6 }} >
              <TextField fullWidth label="Selling Price" name="price" type="number" value={formData.price} onChange={handleInputChange} error={!!errors.price} helperText={errors.price} required InputProps={{ startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon /></InputAdornment> }} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }} >
              <TextField fullWidth label="Original Price (Optional)" name="originalPrice" type="number" value={formData.originalPrice} onChange={handleInputChange} error={!!errors.originalPrice} helperText={errors.originalPrice} InputProps={{ startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon /></InputAdornment> }} />
            </Grid>
          </Grid>

          {/* Description */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}  >
              <TextField fullWidth label="Description (Optional)" name="description" multiline rows={4} value={formData.description} onChange={handleInputChange} error={!!errors.description} helperText={errors.description || `${formData.description.length}/500 characters`} />
            </Grid>
          </Grid>

          {/* Images Section */}
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>Book Images</Typography>
            <Divider sx={{ mt: 1 }} />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Button component="label" variant="outlined" startIcon={<PhotoCamera />} disabled={images.length >= MAX_IMAGES} sx={{ mb: 1 }}>
              {images.length >= MAX_IMAGES ? `Maximum ${MAX_IMAGES} images reached` : 'Upload Images'}
              <VisuallyHiddenInput type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={images.length >= MAX_IMAGES} />
            </Button>
            <Typography variant="body2" color="text.secondary">
              {images.length}/{MAX_IMAGES} images uploaded
            </Typography>
            {errors.images && <Typography color="error" variant="body2">{errors.images}</Typography>}
          </Box>

          {images.length > 0 && (
            <Grid container spacing={2}>
              {images.map((image) => (
                <Grid item key={image.id}>
                  <ImagePreview>
                    <img src={image.preview} alt="Preview" />
                    <DeleteButton size="small" onClick={() => removeImage(image.id)}>
                      <DeleteIcon fontSize="small" />
                    </DeleteButton>
                  </ImagePreview>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Seller Info */}
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>Seller Information</Typography>
            <Divider sx={{ mt: 1 }} />
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <TextField fullWidth label="Your Name" name="sellerName" value={formData.sellerName} onChange={handleInputChange} error={!!errors.sellerName} helperText={errors.sellerName} required />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} error={!!errors.email} helperText={errors.email} required />
            </Grid>
             <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <TextField fullWidth label="Contact Numer" name="contact" value={formData.contact} onChange={handleInputChange}  required />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <TextField fullWidth label="WhatsApp Number" name="whatsapp" type="email" value={formData.whatsapp} onChange={handleInputChange}  required />
            </Grid>
            <Grid size={{ xs: 12, md: 4, sm: 4 }}>
              <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleInputChange} error={!!errors.state} helperText={errors.state} required />
            </Grid>
            <Grid size={{ xs: 12, md: 4, sm: 4 }}>
              <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleInputChange} error={!!errors.city} helperText={errors.city} required />
            </Grid>
            <Grid size={{ xs: 12, md: 4, sm: 4 }}>
              <TextField fullWidth label="PIN Code" name="pinCode" value={formData.pinCode} onChange={handleInputChange} error={!!errors.pinCode} helperText={errors.pinCode} required />
            </Grid>
          </Grid>

          {/* Submit Section */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            {submitMessage && (
              <Snackbar open={open} onClose={handleClose} autoHideDuration={2000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert severity={submitMessage.includes('successfully') ? 'success' : 'error'} sx={{ mb: 2 }} variant='outlined'>
                  {submitMessage}
                </Alert>
              </Snackbar>
            )}
            <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ minWidth: 200 }}>
              {loading ? <CircularProgress size={24} /> : 'List Book for Sale'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );



};

export default SellBookForm;