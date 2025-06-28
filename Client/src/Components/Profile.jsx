import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import {
  Person,
  Email,
  Badge,
  CalendarToday,
  AccountCircle
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    userId: '',
    iat: null,
    exp: null
  });

  // Function to decode JWT token
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Extract user info from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUserInfo({
          name: decoded.name || 'User',
          email: decoded.email || 'No email available',
          userId: decoded.userId || decoded.id || 'No ID available',
          iat: decoded.iat,
          exp: decoded.exp
        });
      }
    }
  }, []);

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: isMobile ? 'short' : 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        px: { xs: 1, sm: 2, md: 3 },
        py: { xs: 2, sm: 3, md: 4 }
      }}
    >
      {/* Header Section */}
      <Box textAlign="center" mb={{ xs: 3, sm: 4 }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom 
          color="primary"
          sx={{ fontWeight: 600 }}
        >
          My Profile
        </Typography>
        <Typography 
          variant={isMobile ? "body2" : "subtitle1"} 
          color="text.secondary"
          sx={{ px: { xs: 2, sm: 0 } }}
        >
          View your account information and details
        </Typography>
      </Box>

      {/* Profile Card */}
      <Card 
        elevation={3} 
        sx={{ 
          mb: { xs: 2, sm: 3 },
          borderRadius: { xs: 2, sm: 3 }
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {/* Avatar and Basic Info */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={{ xs: 2, sm: 3 }} 
            alignItems="center" 
            mb={{ xs: 2, sm: 3 }}
            textAlign={{ xs: "center", sm: "left" }}
          >
            <Avatar
              sx={{
                width: { xs: 60, sm: 70, md: 80 },
                height: { xs: 60, sm: 70, md: 80 },
                bgcolor: 'primary.main',
                fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' },
                fontWeight: 'bold'
              }}
            >
              {getInitials(userInfo.name)}
            </Avatar>
            <Box>
              <Typography 
                variant={isMobile ? 'h6' : 'h5'} 
                color='text.secondary'
                sx={{ 
                  fontWeight: 500,
                  wordBreak: 'break-word'
                }}
              > 
                {userInfo.name}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: { xs: 2, sm: 3 } }} />

          {/* User Details Grid */}
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {/* Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  height: '100%'
                }}
              >
                <Stack 
                  direction="row" 
                  spacing={{ xs: 1.5, sm: 2 }} 
                  alignItems="center"
                >
                  <Person 
                    color="primary" 
                    sx={{ fontSize: { xs: '20px', sm: '24px' } }}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    >
                      Full Name
                    </Typography>
                    <Typography 
                      variant="body1" 
                      fontWeight="medium"
                      sx={{ 
                        fontSize: { xs: '14px', sm: '16px' },
                        wordBreak: 'break-word'
                      }}
                    >
                      {userInfo.name}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  height: '100%'
                }}
              >
                <Stack 
                  direction="row" 
                  spacing={{ xs: 1.5, sm: 2 }} 
                  alignItems="center"
                >
                  <Email 
                    color="primary" 
                    sx={{ fontSize: { xs: '20px', sm: '24px' } }}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    >
                      Email Address
                    </Typography>
                    <Typography 
                      variant="body1" 
                      fontWeight="medium"
                      sx={{ 
                        fontSize: { xs: '14px', sm: '16px' },
                        wordBreak: 'break-all'
                      }}
                    >
                      {userInfo.email}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* User ID */}
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}
              >
                <Stack 
                  direction="row" 
                  spacing={{ xs: 1.5, sm: 2 }} 
                  alignItems="center"
                >
                  <Badge 
                    color="primary" 
                    sx={{ fontSize: { xs: '20px', sm: '24px' } }}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    >
                      User ID
                    </Typography>
                    <Typography 
                      variant="body1" 
                      fontWeight="medium" 
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                        wordBreak: 'break-all',
                        bgcolor: { xs: 'grey.100', sm: 'transparent' },
                        p: { xs: 0.5, sm: 0 },
                        borderRadius: { xs: 1, sm: 0 }
                      }}
                    >
                      {userInfo.userId}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Session Information */}
      <Card 
        elevation={2}
        sx={{ borderRadius: { xs: 2, sm: 3 } }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            gutterBottom 
            color="primary"
            sx={{ 
              fontWeight: 600,
              mb: { xs: 2, sm: 3 }
            }}
          >
            Session Information
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  bgcolor: 'action.hover',
                  borderRadius: 2,
                  height: '100%'
                }}
              >
                <Stack 
                  direction="row" 
                  spacing={{ xs: 1.5, sm: 2 }} 
                  alignItems="center"
                >
                  <CalendarToday 
                    color="action" 
                    fontSize="small"
                    sx={{ fontSize: { xs: '18px', sm: '20px' } }}
                  />
                  <Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    >
                      Token Issued
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontSize: { xs: '12px', sm: '14px' },
                        fontWeight: 500
                      }}
                    >
                      {formatDate(userInfo.iat)}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  bgcolor: 'action.hover',
                  borderRadius: 2,
                  height: '100%'
                }}
              >
                <Stack 
                  direction="row" 
                  spacing={{ xs: 1.5, sm: 2 }} 
                  alignItems="center"
                >
                  <CalendarToday 
                    color="action" 
                    fontSize="small"
                    sx={{ fontSize: { xs: '18px', sm: '20px' } }}
                  />
                  <Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                    >
                      Token Expires
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        fontSize: { xs: '12px', sm: '14px' },
                        fontWeight: 500
                      }}
                    >
                      {formatDate(userInfo.exp)}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;