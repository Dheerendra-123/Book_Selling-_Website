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

const Profile = () => {
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
      month: 'long',
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
    <Container maxWidth="md" >
      {/* Header Section */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          My Profile
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          View your account information and details
        </Typography>
      </Box>

      {/* Profile Card */}
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Avatar and Basic Info */}
          <Stack direction="row" spacing={3} alignItems="center" mb={3}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              {getInitials(userInfo.name)}
            </Avatar>
            <Box>
                <Typography variant='h5' color='text.secondary'> {userInfo.name}</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* User Details Grid */}
          <Grid container spacing={3}>
            {/* Name */}
            <Grid size={{xs:12,sm:6,md:6}}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Person color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {userInfo.name}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* Email */}
            <Grid size={{xs:12,sm:6,md:6}}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Email color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email Address
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {userInfo.email}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* User ID */}
            <Grid size={{xs:12,sm:6,md:6}}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Badge color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      User ID
                    </Typography>
                    <Typography variant="body1" fontWeight="medium" sx={{ fontFamily: 'monospace' }}>
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
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            Session Information
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{xs:12,sm:6,md:6}}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CalendarToday color="action" fontSize="small" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Token Issued
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(userInfo.iat)}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid size={{xs:12,sm:6,md:6}}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CalendarToday color="action" fontSize="small" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Token Expires
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(userInfo.exp)}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;