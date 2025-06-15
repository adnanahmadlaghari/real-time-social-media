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
import { Link as NavLink, useNavigate } from 'react-router-dom';
import { useGlobalVar } from '../components/Global/Global';
import { instance } from '../components/Instance/Instance';
import { Alert } from '@mui/material';

const Login = () => {
    const [formData, setFormData] = React.useState({
        username: "",
        password: ""
    })
    const { setIsToken } = useGlobalVar()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const navigate = useNavigate()
    const [Error, setError] = React.useState("")
    const [success, setSuccess] = React.useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
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

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const response = await instance.post("/auth/login", formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            const token = response.data.accessToken
            if (token) {
                localStorage.setItem("accessToken", token)
                setIsToken(true)
                setSuccess("Logged In successfully")
            }
            navigate("/")
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Box>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <RegisterCard variant="outlined">
                    <>
                        {Error && <Alert severity="error">{Error}</Alert>}
                        {success && <Alert severity="success">{success}</Alert>}
                    </>
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
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            onClick={handleLogin}
                        >
                            {
                                isLoading ? "Signing In..." : "Sign In"
                            }
                        </Button>

                        <Typography sx={{ textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <NavLink
                                to={"/auth/register"}
                            >
                                Sign In
                            </NavLink>
                        </Typography>
                    </Box>
                </RegisterCard>
            </SignInContainer>
        </Box>
    );
}

export default Login