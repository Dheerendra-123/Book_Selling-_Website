import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/api';
import { CurrencyRupee } from '@mui/icons-material';
import DiscountIcon from '@mui/icons-material/Discount';
const PreviewBook = () => {

    const { id } = useParams();

    const [index, setIndex] = useState(0);
    const [images, setImages] = useState([]);
    const handlePrev = () => {
        setIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleThumbnailClick = (thumbIndex) => {
        setIndex(thumbIndex);
    };

    const navigate = useNavigate();
    const handleViewDetail = () => {
        navigate(`/view-details/${bookData._id}`);
    }

    const [bookData, setBookData] = useState([]);
    const getBook = async () => {
        try {
            const response = await api.get(`/api/books/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setBookData(response.data.bookData);
        } catch (error) {
            console.error("Failed to fetch books:", error);
        }
    };

    useEffect(() => {
        getBook();
    }, [])
    useEffect(() => {
        console.log(bookData);
        if (Array.isArray(bookData.images)) {
            setImages([...bookData.images]);
        }
    }, [bookData]);

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'lightgray',
                    width: '100%',
                    height: '20px',
                }}
            />
            <Container maxWidth={false} sx={{ maxWidth: '96%', mt: '10px' }}>
                <Typography variant='h4' color='primary' fontWeight='600' textAlign='center' gutterBottom>
                    Book Preview
                </Typography>
                <Stack direction='row' mt={4}>
                    <Stack direction='column'>
                        {/* Main Image with Navigation */}
                        <Box position="relative" display="inline-block">
                            <Paper
                                height={400}
                                width={600}
                                elevation={1}
                                component='img'
                                src={images[index]}
                                alt='previewImg'
                                sx={{
                                    objectFit: 'fill'
                                }}
                            />

                            {/* Navigation Buttons on Image */}
                            <IconButton
                                onClick={handlePrev}
                                sx={{
                                    position: 'absolute',
                                    left: 10,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                    }
                                }}
                            >
                                <ArrowBackIcon sx={{ fontSize: '35px', color: '#1976D2' }} />
                            </IconButton>

                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    right: 10,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                    }
                                }}
                            >
                                <ArrowForwardIcon sx={{ fontSize: '35px', color: '#1976D2' }} />
                            </IconButton>

                            {/* Image Counter */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 15,
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            >
                                {index + 1} / {images.length}
                            </Box>
                        </Box>

                        {/* Thumbnail Preview */}
                        <Box mt={2} width={600}>
                            <Stack direction="row" spacing={1} justifyContent="center">
                                {images.map((image, thumbIndex) => (
                                    <Paper
                                        key={thumbIndex}
                                        component="img"
                                        src={image}
                                        alt={`thumbnail-${thumbIndex}`}
                                        onClick={() => handleThumbnailClick(thumbIndex)}
                                        sx={{
                                            width: 70,
                                            height: 50,
                                            objectFit: 'cover',
                                            cursor: 'pointer',
                                            border: index === thumbIndex ? '3px solid #1976D2' : '2px solid transparent',
                                            borderRadius: '4px',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                boxShadow: 2
                                            }
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>

                    <Box flexGrow={1} ml={4} sx={{ maxHeight: '500px', overflow: 'hidden', border: '0.5px solid #ebeced', p: '10px', borderRadius: '7px' }}>
                        <Typography variant='h4' color='primary' gutterBottom sx={{ mb: 2 }}>
                            Description
                        </Typography>

                        <Typography variant='body1' color='text.secondary' paragraph sx={{ lineHeight: 1.7, fontSize: '16px', mb: 2 }}>
                            {bookData.description}
                        </Typography>

                        <Box mt={3} mb={3} p={3} sx={{ backgroundColor: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' }}>
                            <Grid container spacing={2} >
                                <Grid size={{ xs: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Title:
                                        </Typography>
                                        <Typography variant="body2" color='text.primary' sx={{ fontSize: '14px', fontWeight: 500 }}>
                                            {bookData.title}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Author:
                                        </Typography>
                                        <Typography variant="body2" color='text.primary' ml={1} sx={{ fontSize: '14px', fontWeight: 500 }}>
                                            {bookData.author}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Price:
                                        </Typography>
                                        <CurrencyRupee style={{ fontSize: "18px" }}></CurrencyRupee>
                                        <Typography variant="body1" color='success.main'  >
                                            {bookData.price}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 6 }} >
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Original:
                                        </Typography>
                                        <CurrencyRupee style={{ fontSize: "18px" }}></CurrencyRupee>
                                        <Typography variant="body1" color='text.secondary' sx={{ textDecoration: 'line-through',mr:'10px' }}>
                                            {bookData.originalPrice}
                                        </Typography>
                                        <Chip
                                            icon={<DiscountIcon />}
                                            size='small'
                                            label={`${Math.round((1 - bookData.price / bookData.originalPrice) * 100)}% OFF`}
                                            color="success"
                                            variant='outlined'
                                            sx={{
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Category:
                                        </Typography>
                                        <Chip
                                            label={bookData.category}
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                            sx={{ height: '24px', fontSize: '12px' }}
                                        />
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Condition:
                                        </Typography>
                                        <Chip
                                            label={bookData.condition}
                                            size='small'
                                            variant='outlined'

                                            color='success'
                                            sx={{ height: '24px', fontSize: '12px', fontWeight: 600 }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box display='flex' justifyContent='center' mt={3}>
                            <Button
                                variant='contained'
                                color='primary'
                                size="medium"
                                onClick={handleViewDetail}
                            >
                                View In Detail
                            </Button>
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default PreviewBook