import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Block as BlockIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon
} from '@mui/icons-material';

const NotAllowed = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
  };

  const handleGoHome = () => {
    // Add your navigation logic here
    console.log('Go to home clicked');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            padding: { xs: 3, sm: 4, md: 5 },
            textAlign: 'center',
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)'
              }}
            >
              <BlockIcon 
                sx={{ 
                  fontSize: 40, 
                  color: 'white' 
                }} 
              />
            </Box>
          </Box>

          {/* Title */}
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#2d3436',
              mb: 2
            }}
          >
            Access Restricted
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
            sx={{
              fontWeight: 500,
              mb: 1
            }}
          >
            You're already logged in
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              lineHeight: 1.6,
              maxWidth: '400px',
              mx: 'auto'
            }}
          >
            This page is not accessible while you're logged in. Please logout first to access this content.
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a6fd8, #6a3093)',
                  boxShadow: '0 6px 25px rgba(102, 126, 234, 0.5)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Logout
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
              sx={{
                borderColor: '#667eea',
                color: '#667eea',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#5a6fd8',
                  color: '#5a6fd8',
                  backgroundColor: 'rgba(102, 126, 234, 0.05)',
                  borderWidth: 2,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Go to Home
            </Button>
          </Box>

          {/* Additional Info */}
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontStyle: 'italic'
              }}
            >
              Need help? Contact our support team for assistance.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotAllowed;