import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Book, ShoppingCart, AttachMoney, Store } from '@mui/icons-material';

const stats = [
  {
    title: 'Books Listed',
    value: 120,
    icon: <Store fontSize="large" color="primary" />,
    color: '#E3F2FD',
  },
  {
    title: 'Books Sold',
    value: 85,
    icon: <ShoppingCart fontSize="large" color="success" />,
    color: '#E8F5E9',
  },
  {
    title: 'Books Bought',
    value: 60,
    icon: <Book fontSize="large" color="secondary" />,
    color: '#F3E5F5',
  },
  {
    title: 'Total Revenue',
    value: '₹12,500',
    icon: <AttachMoney fontSize="large" color="warning" />,
    color: '#FFF8E1',
  },
];

const Analytics = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" mb={4} fontWeight="bold">
        Dashboard Analytics
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: stat.color, borderRadius: 3 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  {stat.icon}
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Analytics;
