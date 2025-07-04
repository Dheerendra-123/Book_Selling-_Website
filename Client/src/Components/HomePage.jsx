import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SellIcon from '@mui/icons-material/Sell'
import useIsMobile from '../../hooks/useMobile'


const HeroSection = () => {
    const navigate = useNavigate()

    const isMobile=useIsMobile();
    const handleBuyClick = () => {
        localStorage.setItem('selectedRole', 'buyer');
        navigate('/login');
    };

    const handleSellClick = () => {
        localStorage.setItem('selectedRole', 'seller')
        navigate('/login');
    };

    return (
        <Box
            sx={{
                backgroundColor: '#fafafa',
                pt: isMobile?4:8,
                pb: 2,
                maxHeight: '100vh'
            }}
        >
            <Container maxWidth="xl">

                {/* Content Section */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxWidth: 900,
                    mx: 'auto',
                    px: { xs: 2, md: 4 }
                }}>

                    {/* Main Heading */}
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            color: '#1f2937',
                            mb: 3,
                            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                            lineHeight: 1.2
                        }}
                    >
                        Buy & Sell{' '}
                        <Box component="span" sx={{
                            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Second-Hand Books
                        </Box>
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#6b7280',
                            mb: 5,
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            fontWeight: 400,
                            lineHeight: 1.6,
                            maxWidth: 700
                        }}
                    >
                        Discover amazing deals on quality books or turn your collection into cash.
                        Join thousands of book lovers in our sustainable marketplace where every book finds a new home.
                    </Typography>

                    {/* Action Buttons */}
                    <Box sx={{
                        display: 'flex',
                        gap: 3,
                        mb: 6,
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCartIcon />}
                            fullWidth
                            onClick={handleBuyClick}
                            sx={{
                                backgroundColor: '#6366f1',
                                color: 'white',
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 3,
                                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#5855eb',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 35px rgba(99, 102, 241, 0.4)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Browse/Buy Books
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<SellIcon />}
                            fullWidth
                            onClick={handleSellClick}
                            sx={{
                                borderColor: '#6366f1',
                                color: '#6366f1',
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 3,
                                borderWidth: 2,
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: '#5855eb',
                                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                                    transform: 'translateY(-2px)',
                                    borderWidth: 2
                                },
                                transition: 'all 0.3s ease'
                            }}

                        >
                            Sell Your Books
                        </Button>
                    </Box>

                    {/* Bottom Description */}
                    <Box sx={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: 3,
                        p: 4,
                        maxWidth: 800,
                        textAlign: 'center'
                    }}>

                        <Typography variant="body1" sx={{
                            color: '#6b7280',
                            lineHeight: 1.7,
                            fontSize: '1.1rem'
                        }}>
                            We connect book lovers across the community, making it easy to find your next great read
                            while giving old books new life. <strong>Sustainable, affordable, and supporting local readers!</strong>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default HeroSection