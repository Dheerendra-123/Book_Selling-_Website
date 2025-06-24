import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import { CheckCircle, HourglassEmpty } from '@mui/icons-material';
import img from '../assets/img.png'

const sampleOrders = [
  {
    _id: '1',
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling',
    edition: '4th',
    image: img,
    price: 499,
    quantity: 1,
    status: 'Delivered',
    purchaseDate: '2025-06-10T00:00:00Z',
  },
  {
    _id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    edition: '1st',
    image: img,
    price: 699,
    quantity: 1,
    status: 'Pending',
    purchaseDate: img,
  },
  {
    _id: '3',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    edition: '2nd',
    image: img,
    price: 799,
    quantity: 1,
    status: 'Delivered',
    purchaseDate: '2025-06-18T00:00:00Z',
  },
];

const MyOrders = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={700} color="text.secondary" textAlign="center" gutterBottom>
        My Orders
      </Typography>

      <Grid container spacing={3} mt={3}>
        {sampleOrders.map((order, index) => (
          <Grid size={{xs:12, sm:4 ,md:3 }} key={order._id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="160"
                image={order.image}
                alt={order.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {order.title.length > 18 ? `${order.title.slice(0, 18)}...` : order.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {order.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Edition: {order.edition}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={2} mt={2}>
                  <Typography variant="body1" fontWeight="bold">
                    ₹{order.price}
                  </Typography>
                  <Chip
                    label={`Qty: ${order.quantity}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Stack>

              
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyOrders;
