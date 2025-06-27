import { Box, Chip, ListItemText, MenuItem, MenuList, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

// 👇 Sample order count for "Confirm Order"
const pendingConfirmations = 4;

const Sidebar = () => {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm','md'));
  const Links = [
    {
      name: "WishList",
      link: 'wishlist',
    },
    {
      name: 'MyOrders',
      link: 'myOrders',
    },
    {
      name: 'Confirm Order',
      link: 'confirm',
      showChip: true, // Special flag to render the chip
      chipCount: pendingConfirmations,
    },
    {
      name: 'BooksListed',
      link: 'booksListed',
    },
  ];

  return (
    !isMobile?(
      <Box sx={{ width: 240, px: 2 }}>
      <Typography variant="h6" fontWeight="bold" mt={2} mb={1} color="primary">
        Dashboard Menu
      </Typography>

      <Stack spacing={1}>
        {Links.map((link, index) => (
          <MenuList key={index} sx={{ p: 0 }}>
            <MenuItem
              component={Link}
              to={link.link}
              sx={{
                borderRadius: 1,
                px: 2,
                py: 1,
                fontWeight: 500,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              }}
            >
              <ListItemText>{link.name}</ListItemText>

              {/* ✅ Optional: Chip for Confirm Order */}
              {link.showChip && (
                <Chip
                  label={link.chipCount}
                  size="small"
                  color="secondary"
                  sx={{ ml: 1 }}
                />
              )}
            </MenuItem>
          </MenuList>
        ))}
      </Stack>
    </Box>
    ):false
    
  );
};

export default Sidebar;
