import React from 'react'
import { useState } from 'react';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { api } from '../api/api';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import {
    PersonAdd,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { handleError, handleSuccess } from '../Utils/Tostify';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';

const SignUP = () => {

    const [isloading, setIsLoding] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: localStorage.getItem('selectedRole')
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoding(true);

        try {
            const role = localStorage.getItem('selectedRole') || 'buyer';
            const payload = { ...formData, role };

            const response = await api.post(`/api/user/signup`, payload);

            if (response.data.success) {
                handleSuccess("User Registered Successfully");

                localStorage.removeItem('selectedRole');

                navigate('/login');
            } else {
                handleError(response.data.message || "Signup failed");
            }
        } catch (error) {
            handleError("Something went wrong. Try again later.");
            console.error(error);
        } finally {
            setIsLoding(false);
        }
    };


    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
            <Paper elevation={2} sx={{
                p: { xs: 2.5, sm: 3 },
                width: '80%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',

            }}>

                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Avatar
                        sx={{
                            width: 44,
                            height: 44,
                            bgcolor: 'primary.main',
                            mx: 'auto',
                            mb: 1.5,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        <PersonAdd fontSize="small" />
                    </Avatar>
                    <Typography variant='h5' gutterBottom>
                        SignUp here
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Stack gap={3}>
                        <TextField
                            required
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            required
                            label="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete='email'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        >

                        </TextField>

                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />

                        </FormControl>
                        <Button type='submit' variant='contained' size='large'   disabled={isloading}>
                             {isloading ? <CircularProgress size={25} color='inherit' /> : 'Sign Up'}
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant='h7' color='grey'>
                                Already have account?
                                <Typography variant='h7' color='blue' sx={{ ml: '5px' }} >
                                    <Link to='/login' style={{ textDecoration: 'none' }}>Login here</Link>
                                </Typography>
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Paper>
        </Container >
    )
}

export default SignUP