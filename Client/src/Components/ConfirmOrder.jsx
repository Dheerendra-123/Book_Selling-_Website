import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Divider,
    Button,
    List,
    ListItem,
    ListItemText,
    Stack,
} from '@mui/material';

const sampleOrders = [
    {
        id: 'ORD123',
        shippingInfo: {
            name: 'John Doe',
            address: '123 MG Road, Bengaluru, Karnataka, 560001',
            phone: '+91 9876543210',
        },
        items: [
            { title: 'Atomic Habits', quantity: 1, price: 499 },
        ],
    },
    {
        id: 'ORD124',
        shippingInfo: {
            name: 'Jane Smith',
            address: '789 Link Street, Mumbai, Maharashtra, 400001',
            phone: '+91 9123456780',
        },
        items: [
            { title: 'Clean Code', quantity: 1, price: 699 },
        ],
    },
    {
        id: 'ORD125',
        shippingInfo: {
            name: 'Amit Verma',
            address: '456 Sector 9, Noida, Uttar Pradesh, 201301',
            phone: '+91 9012345678',
        },
        items: [
            { title: 'Design Patterns', quantity: 1, price: 599 },
        ],

    },
    {
        id: 'ORD126',
        shippingInfo: {
            name: 'Priya Iyer',
            address: '12 Residency Road, Chennai, Tamil Nadu, 600001',
            phone: '+91 9988776655',
        },
        items: [
            { title: 'The Lean Startup', quantity: 1, price: 549 },
        ],
    },
];

const ConfirmOrder = () => {
    return (
        <Box p={3}>
            <Typography
                variant="h4"
                fontWeight={700}
                color="text.secondary"
                textAlign="center"
                gutterBottom
            >
                Confirm All Orders
            </Typography>

            <Grid container spacing={3}>
                {sampleOrders.map((order) => {
                    const subtotal = order.items.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                    );
          

                    return (
                        <Grid size={{xs:12,sm:4,md:3}} key={order.id}>
                            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Order ID: {order.id}
                                </Typography>

                                <Stack spacing={1} mb={2}>
                                    <Typography><strong>Name:</strong> {order.shippingInfo.name}</Typography>
                                    <Typography><strong>Phone:</strong> {order.shippingInfo.phone}</Typography>
                                    <Typography>
                                        <strong>Address:</strong>{' '}
                                        {order.shippingInfo.address.length > 40
                                            ? `${order.shippingInfo.address.slice(0, 40)}\n${order.shippingInfo.address.slice(40)}`
                                            : order.shippingInfo.address}
                                    </Typography>
                                </Stack>

                                <Divider sx={{ mb: 2 }} />

                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                    Items
                                </Typography>
                                <List disablePadding>
                                    {order.items.map((item, idx) => (
                                        <ListItem key={idx} sx={{ py: 1, px: 0 }}>
                                            <ListItemText
                                                primary={item.title}
                                                secondary={`Quantity: ${item.quantity}`}
                                            />
                                            <Typography variant="body1">
                                                ₹{item.price * item.quantity}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider sx={{ my: 2 }} />

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 2, borderRadius: 2 }}
                                    onClick={() => alert(`Order ${order.id} confirmed!`)}
                                >
                                    Confirm Order
                                </Button>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ConfirmOrder;
