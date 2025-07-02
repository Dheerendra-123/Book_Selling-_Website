
import {
  Box,
  Chip,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  Fab
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DashboardCustomizeOutlined} from '@mui/icons-material';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

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
      name: 'BooksListed',
      link: 'booksListed',
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar content component
  const SidebarContent = ({ onClose = null }) => (
    <Box sx={{ width: 240, px: 2 }}>
      {/* Close button for mobile */}
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}

      <Typography variant="h6" fontWeight="bold" mt={2} mb={1} color="primary">
        Dashboard Menu
      </Typography>

      <Stack spacing={1}>
        {Links.map((link, index) => (
          <MenuList key={index} sx={{ p: 0 }}>
            <MenuItem
              component={Link}
              to={link.link}
              onClick={isMobile ? onClose : undefined} // Close drawer on mobile when link is clicked
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
  );

  return (
    <>
      {/* Mobile Menu Button - Floating Action Button */}
      {isMobile && !mobileOpen && (
        <IconButton
          aria-label="open menu"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 65,
            left: 10,
            zIndex: (theme) => theme.zIndex.speedDial,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <DashboardCustomizeOutlined/>
        </IconButton>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && <SidebarContent />}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          }}
        >
          <SidebarContent onClose={handleDrawerToggle} />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;