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
import { instance } from '../components/Instance/Instance';
import { useGlobalVar } from '../components/Global/Global';
import { Alert, Avatar } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Register = () => {

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        username: "",
        role: "User",
        password: "",
        profile: null
    })
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { setIsToken, setCurrentUser } = useGlobalVar()
    const navigate = useNavigate()
    const [Error, setError] = React.useState("")
    const [success, setSuccess] = React.useState("")

    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));

            // Set profile in formData
            setFormData((prev:any) => ({
                ...prev,
                profile: file
            }));
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    

    const handleRegister = async () => {
        setIsLoading(true)
        try {
            const data = new FormData();
            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("username", formData.username);
            data.append("role", formData.role);
            data.append("password", formData.password);
            if (formData.profile) {
                data.append("profile", formData.profile);
            }

            const response = await instance.post("/auth/register", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            const token = response.data.accessToken
            if (token) {
                localStorage.setItem("accessToken", token)
                setIsToken(true)
            }
            const user = response.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            setCurrentUser(user);

            setSuccess("Acount Created Successfully")
            navigate("/")
        } catch (error) {
            if (error?.code === "ERR_NETWORK") {
                setError(error?.message)
            } else {
                console.log(error)
                setError(error?.response?.data?.error)
            }

        } finally {
            setIsLoading(false)
        }
    }

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
    React.useEffect(() => {
        if (Error) {
            const timer = setTimeout(() => {
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [Error]);

    React.useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success]);

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
                        Sign Up
                    </Typography>
                    <FormControl sx={{ alignItems: "center" }}>
                        <Avatar src={imagePreview || undefined} onClick={() => fileInputRef.current?.click()} sx={{ height: "100px", width: "100px" }} />
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} hidden />
                    </FormControl>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 1.5,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="firstName">First Name</FormLabel>
                            <TextField
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="lastName">Last Name</FormLabel>
                            <TextField
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <TextField
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>


                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='role'
                                value={formData.role}
                                label="role"
                                onChange={handleChange}

                            >
                                <MenuItem value={"User"}>User</MenuItem>
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>

                        <Button
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleRegister}
                        >
                            Sign Up
                        </Button>

                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account{' '}
                            <NavLink
                                to={"/auth/signin"}
                            >
                                {
                                    isLoading ? "Creating Account" : "Sign In"
                                }
                            </NavLink>
                        </Typography>
                    </Box>
                </RegisterCard>
            </SignInContainer>
        </Box>
    );
}

export default Register