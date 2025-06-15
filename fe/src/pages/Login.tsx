import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SignInContainer from '../components/SignInContainer';
import RegisterCard from '../components/RegisterCard';
import { Link as NavLink } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }))
    };



    // const validateInputs = () => {
    //     const email = document.getElementById('email') as HTMLInputElement;
    //     const password = document.getElementById('password') as HTMLInputElement;

    //     let isValid = true;

    //     if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    //         setEmailError(true);
    //         setEmailErrorMessage('Please enter a valid email address.');
    //         isValid = false;
    //     } else {
    //         setEmailError(false);
    //         setEmailErrorMessage('');
    //     }

    //     if (!password.value || password.value.length < 6) {
    //         setPasswordError(true);
    //         setPasswordErrorMessage('Password must be at least 6 characters long.');
    //         isValid = false;
    //     } else {
    //         setPasswordError(false);
    //         setPasswordErrorMessage('');
    //     }

    //     return isValid;
    // };

    return (
        <Box>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <RegisterCard variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">username</FormLabel>
                            <TextField
                                type="username"
                                name="username"
                                placeholder="username"
                                value={formData.username}
                                onChange={handleChange}
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                name="password"
                                placeholder="••••••"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <Typography>
                            Forgot your password?
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign in
                        </Button>

                        <Typography sx={{ textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <NavLink
                                to={"/auth/register"}
                            >
                                Sign up
                            </NavLink>
                        </Typography>
                    </Box>
                </RegisterCard>
            </SignInContainer>
        </Box>
    );
}

export default Login