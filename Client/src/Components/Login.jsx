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
    Person,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { handleError, handleSuccess } from '../Utils/Tostify';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
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
        setIsLoading(true);
        try {
            const response = await api.post(`/api/user/login`, formData);
            if (response.data.success) {
                handleSuccess("User Logged In Sucessfully")
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    navigate('/home');
                }, 100);
            }
            else {
                if (response.data.success == false)
                    handleError(response.data.message)
            }
        } catch (error) {
            handleError("Server Error Check Your Internet Connection");
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

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
                        <Person fontSize="small" />
                    </Avatar>
                    <Typography variant='h5' gutterBottom>
                        Login here
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Stack gap={3}>

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
                        <Button type='submit' variant='contained' size='large'>
                            {isLoading ? <CircularProgress size='medium'/> : 'Login'}
                        </Button>
                        <Box sx={{textAlign:'center'}}>
                        <Typography variant='h7' color='grey'>
                            Dont have account? 
                            <Typography variant='h7' color='blue' sx={{ml:'5px'}} >
                                <Link to='/signup' style={{textDecoration:'none'}}>SignUp here</Link>
                            </Typography>
                        </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Paper>
        </Container >
    )
}

export default Login