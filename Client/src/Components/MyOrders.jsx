import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import { CheckCircle, HourglassEmpty } from '@mui/icons-material';
import { handleError } from '../Utils/Tostify';
import { api } from '../api/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      handleError(err?.response?.data?.message || 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        fontWeight={700}
        color="text.secondary"
        textAlign="center"
        gutterBottom
      >
        My Orders
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Typography textAlign="center" color="text.secondary" mt={5}>
          No orders found.
        </Typography>
      ) : (
        <Grid container spacing={3} mt={3}>
          {orders.map((order) =>
            order.items.map((item) => {
              const product = item.product || {};
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : '/default.jpg'
                      }
                      alt={product.title || 'Book'}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight={600}>
                        {product.title?.length > 18
                          ? `${product.title.slice(0, 18)}...`
                          : product.title || 'Untitled'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Author: {product.author || 'Unknown'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Edition: {product.edition || 'N/A'}
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={2} mt={2}>
                        <Typography variant="body1" fontWeight="bold">
                          ₹{product.price || 'N/A'}
                        </Typography>
                        <Chip
                          label={`Qty: ${item.quantity || 1}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                        {order.isPaid ? (
                          <CheckCircle color="success" fontSize="small" />
                        ) : (
                          <HourglassEmpty color="warning" fontSize="small" />
                        )}
                        <Typography variant="body2" color="text.secondary">
                          {order.isPaid ? 'Paid' : 'Payment to be pain in cod mode'}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      )}
    </Box>
  );
};

export default MyOrders;
