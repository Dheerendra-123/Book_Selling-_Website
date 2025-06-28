import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { LogoutOutlined, SellOutlined, Home } from '@mui/icons-material';
import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../Utils/Tostify';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/cartSlice';
import { api } from '../api/api';
import { Stack } from '@mui/material';

const PrimarySearchAppBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // State for mobile menu
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [accountMenuAnchor, setAccountMenuAnchor] = React.useState(null);
    
    const cartItems = useSelector((state) => state.cart.items);
    const isAccountMenuOpen = Boolean(accountMenuAnchor);

    // Navigation handlers
    const cartHandle = () => {
        navigate('/cart');
        setMobileOpen(false);
    };

    const handleLogo = () => {
        navigate('/home');
        setMobileOpen(false);
    };

    const handleAccountClick = (event) => {
        if (window.innerWidth >= 960) { // md breakpoint
            navigate('/dashboard');
        } else {
            setAccountMenuAnchor(event.currentTarget);
        }
    };

    const handleAccountMenuClose = () => {
        setAccountMenuAnchor(null);
    };

    const handleDashboard = () => {
        navigate('/dashboard');
        handleAccountMenuClose();
        setMobileOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('selectedRole');
        setTimeout(() => {
            navigate('/home');
            handleSuccess('Successfully Logout');
        }, 200);
        setMobileOpen(false);
        handleAccountMenuClose();
    };

    const handleSellBook = () => {
        navigate('/sell-form');
        setMobileOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileOpen(!mobileOpen);
    };

    // Fetch cart data on navbar load if token exists
    React.useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await api.get('/api/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(setCartItems(res.data.items || []));
            } catch (err) {
                console.error('Failed to load cart:', err);
            }
        };

        fetchCart();
    }, [dispatch]);

    // Mobile drawer content
    const mobileMenu = (
        <Box sx={{ width: 280 }} role="presentation">
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Box
                    component="img"
                    src={logo}
                    alt="Bookish Logo"
                    sx={{ height: 50, mr: 2 }}
                />
               
            </Box>
            <Divider />
            <List>
                <ListItem button onClick={handleLogo}>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
               
                <ListItem button onClick={handleSellBook}>
                    <ListItemIcon>
                        <SellOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Sell Book" />
                </ListItem>
                
                <ListItem button onClick={cartHandle}>
                    <ListItemIcon>
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Cart" />
                </ListItem>
                
                <ListItem button onClick={handleDashboard}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Account" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
                <Toolbar sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
                    {/* Mobile menu button */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleMobileMenu}
                        sx={{ 
                            mr: 2, 
                            display: { md: 'none' },
                            color: 'text.primary'
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo - visible on all screens but responsive sizing */}
                    <Box
                        component="img"
                        src={logo}
                        alt="Bookish Logo"
                        sx={{
                            height: { xs: 40, sm: 50, md: 70 },
                            display: 'block',
                            cursor: 'pointer',
                            mr: { xs: 1, sm: 2, md: 3 }
                        }}
                        onClick={handleLogo}
                    />

                

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Desktop menu items */}
                    <Box
                        sx={{ 
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        {/* Sell Book */}
                        <IconButton
                            size="large"
                            color="inherit"
                            disableRipple
                            sx={{
                                color: 'text.secondary',
                                flexDirection: 'column',
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                            onClick={handleSellBook}
                        >
                            <SellOutlined sx={{ fontSize: '26px' }} />
                            <Typography variant="caption" sx={{ mt: 0.5 }}>
                                Sell Book
                            </Typography>
                        </IconButton>

                        {/* Cart */}
                        <IconButton
                            size="large"
                            color="inherit"
                            disableRipple
                            sx={{
                                color: 'text.secondary',
                                flexDirection: 'column',
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                            onClick={cartHandle}
                        >
                            <Badge badgeContent={cartItems.length} color="error">
                                <ShoppingCartOutlinedIcon sx={{ fontSize: '30px' }} />
                            </Badge>
                            <Typography variant="caption" sx={{ mt: 0.5 }}>
                                Cart
                            </Typography>
                        </IconButton>

                        {/* Account */}
                        <IconButton
                            size="large"
                            color="inherit"
                            disableRipple
                            sx={{
                                color: 'text.secondary',
                                flexDirection: 'column',
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                            onClick={handleAccountClick}
                        >
                            <AccountCircleOutlinedIcon sx={{ fontSize: '35px' }} />
                            <Typography variant="caption" sx={{ mt: 0.5 }}>
                                My Account
                            </Typography>
                        </IconButton>

                        {/* Logout */}
                        <IconButton
                            size="large"
                            color="inherit"
                            disableRipple
                            sx={{
                                color: 'text.secondary',
                                flexDirection: 'column',
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                            onClick={handleLogout}
                        >
                            <LogoutOutlined sx={{ fontSize: '30px' }} />
                            <Typography variant="caption" sx={{ mt: 0.5 }}>
                                Logout
                            </Typography>
                        </IconButton>
                    </Box>

                    {/* Tablet view - show only cart and account */}
                    <Box
                        sx={{ 
                            display: { xs: 'none', sm: 'flex', md: 'none' },
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={cartHandle}
                            sx={{ color: 'text.secondary' }}
                        >
                            <Badge badgeContent={cartItems.length} color="error">
                                <ShoppingCartOutlinedIcon sx={{ fontSize: '28px' }} />
                            </Badge>
                        </IconButton>

                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleAccountClick}
                            sx={{ color: 'text.secondary' }}
                        >
                            <AccountCircleOutlinedIcon sx={{ fontSize: '32px' }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={toggleMobileMenu}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 280,
                    },
                }}
            >
                {mobileMenu}
            </Drawer>

            {/* Account menu for tablet view */}
            <Menu
                anchorEl={accountMenuAnchor}
                open={isAccountMenuOpen}
                onClose={handleAccountMenuClose}
                onClick={handleAccountMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleDashboard}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                </MenuItem>
                <MenuItem onClick={handleSellBook}>
                    <ListItemIcon>
                        <SellOutlined fontSize="small" />
                    </ListItemIcon>
                    Sell Book
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutOutlined fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default PrimarySearchAppBar;