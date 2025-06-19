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
import logo from '../assets/logo.jpg'
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f0f7f6',
    '&:hover': {
        backgroundColor: '#f7f7f7'
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
    color: '#555', // brighter weighted gray
    fontWeight: 500, // make it slightly bold for better visibility
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '30ch', // increased width
        },
        [theme.breakpoints.up('md')]: {
            width: '50ch', // further increase for larger screens
        },
    },
}));

const PrimarySearchAppBar = () => {

    const navigate = useNavigate();

    const cartHandle = () => {
        navigate('/cart');
    }

    const handleLogo = () => {
        navigate('/home');
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Toolbar>

                    <Box
                        component='img'
                        src={logo}
                        alt="Bookish Logo"
                        mr={3}
                        sx={{
                            height: 70,       // adjust as needed
                            display: { xs: 'none', sm: 'block' },
                            cursor: 'pointer'
                        }}
                        onClick={handleLogo}
                    />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: '#555' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }} mr={2} gap={2} alignItems='center'>
                        <IconButton size="large" aria-label="show 4 new mails" color="grey">
                            <Badge badgeContent={4} color="error">
                                < ShoppingCartOutlinedIcon sx={{ fontSize: '30px' }} onClick={cartHandle} />

                            </Badge>

                        </IconButton>
                        <Typography variant='body1' color='text.secondary'>
                            Cart
                        </Typography>
                        <Box>
                            <IconButton
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <AccountCircleOutlinedIcon sx={{fontSize:"35px"}}/>
                            </IconButton>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                            
                        </Box>
                        <Typography variant='body1' color='text.secondary'>My Account</Typography>
                    </Box>
                </Toolbar>
            </AppBar>

        </Box>
    );
}

export default PrimarySearchAppBar;