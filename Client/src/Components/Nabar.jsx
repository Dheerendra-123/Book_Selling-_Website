import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import logo from '../assets/logo.jpg';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Stack } from '@mui/material';
import { handleSuccess } from '../Utils/Tostify';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/cartSlice'; // ✅ import setCartItems
import { api } from '../api/api';
import { jwtDecode } from 'jwt-decode';
import { LogoutOutlined } from '@mui/icons-material';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f0f7f6',
    '&:hover': {
        backgroundColor: '#f7f7f7',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#555',
    fontWeight: 500,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
        },
        [theme.breakpoints.up('md')]: {
            width: '50ch',
        },
    },
}));

const PrimarySearchAppBar = () => {
const role = localStorage.getItem('selectedRole');


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartHandle = () => {
        navigate('/cart');
    };

    const handleLogo = () => {
        navigate('/home');
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('selectedRole')
        setTimeout(() => {
            navigate('/home');
            handleSuccess('Successfully Logout');
        }, 200);
    };

    const cartItems = useSelector((state) => state.cart.items);

    // ✅ Fetch cart data on navbar load if token exists
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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <Box
                        component="img"
                        src={logo}
                        alt="Bookish Logo"
                        mr={3}
                        sx={{
                            height: 70,
                            display: { xs: 'none', sm: 'block' },
                            cursor: 'pointer',
                        }}
                        onClick={handleLogo}
                    />
                    {
                        role!='seller'&&(
                            <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: '#555' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                        )
                    }

                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                       
                        alignItems="center"
                    >

                        {role!='seller'&&(
                        <IconButton size="large" color="grey"
                            disableRipple
                            sx={{
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                    backgroundColor: 'transparent',
                                },
                                '&:active': {
                                    boxShadow: 'none',
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <Badge badgeContent={cartItems.length} color="error">
                                <ShoppingCartOutlinedIcon
                                    sx={{ fontSize: '30px' }}
                                    onClick={cartHandle}
                                />
                            </Badge>
                            <Typography variant="body1" color="text.secondary" ml={1}>
                                Cart
                            </Typography>
                        </IconButton>
                        )}

                        <Box>
                            <IconButton
                                disableRipple
                                sx={{
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: 'none',
                                        backgroundColor: 'transparent',
                                    },
                                    '&:active': {
                                        boxShadow: 'none',
                                        backgroundColor: 'transparent',
                                    },
                                }}
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={role === 'seller' ? handleLogout : handleClick}
                            >
                                {
                                    role==='seller'?(<LogoutOutlined sx={{ fontSize: '35px' }}/>):
                                     <AccountCircleOutlinedIcon sx={{ fontSize: '35px' }}/>
                                }
                                
                               
                                <Typography variant="body1" color="text.secondary" ml={1}>
                                   {role==='seller'? 'Logout':'My Account'}
                                </Typography>
                            </IconButton>
                      {
                        role!='seller'&&(
                                  <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        )
                      }

                        </Box>

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default PrimarySearchAppBar;
