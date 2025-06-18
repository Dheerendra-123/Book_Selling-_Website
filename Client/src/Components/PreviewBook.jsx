import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import img from '../assets/img.png'
import Paper from '@mui/material/Paper';
import hero from '../assets/hero.jpg'
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const PreviewBook = () => {
    const images = [img, hero, img, hero, img, hero];
    const [index, setIndex] = useState(0);

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
     
    const navigate=useNavigate();
     const handleViewDetail=()=>{
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

                    <Box flexGrow={1} ml={4} sx={{ maxHeight: '500px', overflow: 'hidden',border:'0.5px solid #ebeced',p:'10px',borderRadius:'7px' }}>
                        <Typography variant='h4' color='primary' gutterBottom sx={{  mb: 2 }}>
                            Description
                        </Typography>
                        
                        <Typography variant='body1' color='text.secondary' paragraph sx={{ lineHeight: 1.7, fontSize: '16px', mb: 2 }}>
                            Immerse yourself in the epic world of Westeros with this captivating tale of power, betrayal, and dragons. A masterpiece that redefined fantasy literature.
                        </Typography>
                        
                        <Typography variant='body1' color='text.secondary' paragraph sx={{ lineHeight: 1.7, fontSize: '16px', mb: 3 }}>
                            Perfect condition book with original binding and crisp pages. A must-have for any fantasy lover's collection.
                        </Typography>

                        <Box mt={3} mb={3} p={3} sx={{ backgroundColor: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' }}>
                            <Grid container spacing={2} >
                                <Grid item xs={6}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Title:
                                        </Typography>
                                        <Typography variant="body2" color='text.primary' sx={{ fontSize: '14px', fontWeight: 500 }}>
                                            Game of Thrones
                                        </Typography>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Author:
                                        </Typography>
                                        <Typography variant="body2" color='text.primary' ml={1} sx={{ fontSize: '14px', fontWeight: 500 }}>
                                            George R.R. Martin
                                        </Typography>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Price:
                                        </Typography>
                                        <Typography variant="body2" color='success.main' ml={1} sx={{ fontSize: '16px', fontWeight: 700 }}>
                                            ₹200
                                        </Typography>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Original:
                                        </Typography>
                                        <Typography variant="body2" color='text.secondary' ml={1} sx={{ fontSize: '14px', textDecoration: 'line-through' }}>
                                            ₹400
                                        </Typography>
                                        <Chip label="50% OFF" size="small" variant='outlined' color="error" sx={{ ml: 1, height: '20px', fontSize: '11px' }} />
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Category:
                                        </Typography>
                                        <Chip 
                                            label="Fantasy" 
                                            size="small" 
                                            variant="outlined" 
                                            color="primary"
                                            sx={{ height: '24px', fontSize: '12px' }}
                                        />
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={6}>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <Typography variant="subtitle2" color='primary' sx={{ fontWeight: 700, minWidth: '90px', fontSize: '14px' }}>
                                            Condition:
                                        </Typography>
                                        <Chip 
                                            label="Like New" 
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