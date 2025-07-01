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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CircularProgress } from '@mui/material';

const PreviewBook = () => {
    const theme = useTheme();
    const [mainImageLoaded, setMainImageLoaded] = useState(false);

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

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
            <Container maxWidth={false} sx={{ maxWidth: '96%', mt: 3, px: { xs: 1, sm: 2 } }}>
                <Typography
                    variant={isMobile ? 'h5' : 'h4'}
                    color='primary'
                    fontWeight='600'
                    textAlign='center'
                    gutterBottom
                    sx={{ mb: { xs: 2, md: 3 } }}
                >
                    Book Preview
                </Typography>

                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 3, md: 4 }}
                    mt={{ xs: 2, md: 4 }}
                >
                    <Stack direction='column' sx={{ width: { xs: '100%', md: 'auto' } }}>
                        {/* Main Image with Navigation */}
                        <Box position="relative" display="inline-block">
                            <Paper
                                elevation={1}
                                sx={{
                                    width: { xs: '100%', sm: '500px', md: '600px' },
                                    height: { xs: '250px', sm: '350px', md: '400px' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    backgroundColor: '#f1f1f1',
                                    borderRadius: '8px',
                                }}
                            >
                                {!mainImageLoaded && <CircularProgress />}
                                <Box
                                    component="img"
                                    src={images[index]}
                                    alt="previewImg"
                                    loading="lazy"
                                    onLoad={() => setMainImageLoaded(true)}
                                    style={{
                                        display: mainImageLoaded ? 'block' : 'none',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'fill',
                                    }}
                                />
                            </Paper>
                            {/* Navigation Buttons on Image */}
                            <IconButton
                                onClick={handlePrev}
                                sx={{
                                    position: 'absolute',
                                    left: { xs: 5, md: 10 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    size: { xs: 'small', md: 'medium' },
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                    }
                                }}
                            >
                                <ArrowBackIcon sx={{ fontSize: { xs: '25px', md: '35px' }, color: '#1976D2' }} />
                            </IconButton>

                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    right: { xs: 5, md: 10 },
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    size: { xs: 'small', md: 'medium' },
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                    }
                                }}
                            >
                                <ArrowForwardIcon sx={{ fontSize: { xs: '25px', md: '35px' }, color: '#1976D2' }} />
                            </IconButton>

                            {/* Image Counter */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: { xs: 5, md: 10 },
                                    right: { xs: 10, md: 15 },
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: { xs: '12px', md: '14px' }
                                }}
                            >
                                {index + 1} / {images.length}
                            </Box>
                        </Box>

                        {/* Thumbnail Preview */}
                        <Box mt={2} sx={{ width: { xs: '100%', sm: '500px', md: '600px' } }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                sx={{
                                    overflowX: 'auto',
                                    pb: 1,
                                    '&::-webkit-scrollbar': {
                                        height: '4px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: '#f1f1f1',
                                        borderRadius: '2px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: '#1976D2',
                                        borderRadius: '2px',
                                    }
                                }}
                            >
                                {images.map((image, thumbIndex) => (
                                    <Paper
                                        key={thumbIndex}
                                        component="img"
                                        src={image}
                                        alt={`thumbnail-${thumbIndex}`}
                                        onClick={() => handleThumbnailClick(thumbIndex)}
                                        sx={{
                                            width: { xs: 50, sm: 60, md: 70 },
                                            height: { xs: 35, sm: 42, md: 50 },
                                            minWidth: { xs: 50, sm: 60, md: 70 },
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

                    <Box
                        flexGrow={1}
                        sx={{
                            maxHeight: { xs: 'none', md: '500px' },
                            overflow: { xs: 'visible', md: 'hidden' },
                            border: '0.5px solid #ebeced',
                            p: { xs: 2, md: '10px' },
                            borderRadius: '7px'
                        }}
                    >
                        <Typography
                            variant={isMobile ? 'h5' : 'h4'}
                            color='primary'
                            gutterBottom
                            sx={{ mb: 2 }}
                        >
                            Description
                        </Typography>

                        <Typography
                            variant='body1'
                            color='text.secondary'
                            paragraph
                            sx={{
                                lineHeight: 1.7,
                                fontSize: { xs: '14px', md: '16px' },
                                mb: 2
                            }}
                        >
                            {bookData.description}
                        </Typography>

                        <Box
                            mt={3}
                            mb={3}
                            p={{ xs: 2, md: 3 }}
                            sx={{
                                backgroundColor: '#f8f9fa',
                                borderRadius: '12px',
                                border: '1px solid #e9ecef'
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography
                                            variant="subtitle2"
                                            color='primary'
                                            sx={{
                                                fontWeight: 700,
                                                minWidth: { xs: '70px', md: '90px' },
                                                fontSize: { xs: '12px', md: '14px' }
                                            }}
                                        >
                                            Title:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color='text.primary'
                                            sx={{
                                                fontSize: { xs: '12px', md: '14px' },
                                                fontWeight: 500,
                                                ml: 1,
                                                wordBreak: 'break-word'
                                            }}
                                        >
                                            {bookData.title}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography
                                            variant="subtitle2"
                                            color='primary'
                                            sx={{
                                                fontWeight: 700,
                                                minWidth: { xs: '70px', md: '90px' },
                                                fontSize: { xs: '12px', md: '14px' }
                                            }}
                                        >
                                            Author:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color='text.primary'
                                            ml={1}
                                            sx={{
                                                fontSize: { xs: '12px', md: '14px' },
                                                fontWeight: 500,
                                                wordBreak: 'break-word'
                                            }}
                                        >
                                            {bookData.author}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography
                                            variant="subtitle2"
                                            color='primary'
                                            sx={{
                                                fontWeight: 700,
                                                minWidth: { xs: '70px', md: '90px' },
                                                fontSize: { xs: '12px', md: '14px' }
                                            }}
                                        >
                                            Price:
                                        </Typography>
                                        <CurrencyRupee style={{ fontSize: isMobile ? "16px" : "18px" }}></CurrencyRupee>
                                        <Typography
                                            variant="body1"
                                            color='success.main'
                                            sx={{ fontSize: { xs: '14px', md: '16px' } }}
                                        >
                                            {bookData.price}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5} flexWrap="wrap" gap={1}>
                                        <Typography
                                            variant="subtitle2"
                                            color='primary'
                                            sx={{
                                                fontWeight: 700,
                                                minWidth: { xs: '70px', md: '90px' },
                                                fontSize: { xs: '12px', md: '14px' }
                                            }}
                                        >
                                            Original:
                                        </Typography>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <CurrencyRupee style={{ fontSize: isMobile ? "16px" : "18px" }}></CurrencyRupee>
                                            <Typography
                                                variant="body1"
                                                color='text.secondary'
                                                sx={{
                                                    textDecoration: 'line-through',
                                                    fontSize: { xs: '14px', md: '16px' }
                                                }}
                                            >
                                                {bookData.originalPrice}
                                            </Typography>
                                            <Chip
                                                icon={<DiscountIcon sx={{ fontSize: { xs: '12px', md: '14px' } }} />}
                                                size='small'
                                                label={`${Math.round((1 - bookData.price / bookData.originalPrice) * 100)}% OFF`}
                                                color="success"
                                                variant='outlined'
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: { xs: '10px', md: '12px' },
                                                    height: { xs: '20px', md: '24px' }
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography
                                            variant="subtitle2"
                                            color='primary'
                                            sx={{
                                                fontWeight: 700,
                                                minWidth: { xs: '70px', md: '90px' },
                                                fontSize: { xs: '12px', md: '14px' }
                                            }}
                                        >
                                            Category:
                                        </Typography>
                                        <Chip
                                            label={bookData.category}
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                            sx={{
                                                height: { xs: '20px', md: '24px' },
                                                fontSize: { xs: '10px', md: '12px' },
                                                ml: 1
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography
                                            variant="subtitle2"
                                            color='primary'
                                            sx={{
                                                fontWeight: 700,
                                                minWidth: { xs: '70px', md: '90px' },
                                                fontSize: { xs: '12px', md: '14px' }
                                            }}
                                        >
                                            Condition:
                                        </Typography>
                                        <Chip
                                            label={bookData.condition}
                                            size='small'
                                            variant='outlined'
                                            color='success'
                                            sx={{
                                                height: { xs: '20px', md: '24px' },
                                                fontSize: { xs: '10px', md: '12px' },
                                                fontWeight: 600,
                                                ml: 1
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box display='flex' justifyContent='center' mt={3}>
                            <Button
                                variant='contained'
                                color='primary'
                                size={isMobile ? "small" : "medium"}
                                onClick={handleViewDetail}
                                sx={{
                                    fontSize: { xs: '12px', md: '14px' },
                                    px: { xs: 2, md: 3 }
                                }}
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