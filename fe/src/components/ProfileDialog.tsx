import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';
import { Avatar, Badge, Stack, TextField } from '@mui/material';
import { useGlobalVar } from './Global/Global';
import { AddAPhoto } from '@mui/icons-material';
import { instance } from './Instance/Instance';
import Snackbar from './Alert';

interface Props {
    open: () => void,
    handleClose: () => void

}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileDialog: React.FC<Props> = ({ open, handleClose }) => {

    const { CrruntUser, setCurrentUser } = useGlobalVar()

    const [formData, setFormData] = React.useState({
        firstName: CrruntUser.firstName,
        lastName: CrruntUser.lastName,
        username: CrruntUser.username
    })

    const [Image, setImage] = React.useState<File | null>(null)

    const [imagePreview, setImagePreview] = React.useState<string | null>(null)

    const inputRef = React.useRef<HTMLInputElement>(null)

    const [IsLoading, setIsLoading] = React.useState(false)
    const [alert, setAlert] = React.useState<{ msg: string; severity: "error" | "warning" | "info" | "success" } | null>(null);
    const [openToast, setOpenToast] = React.useState(false)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageSubmit = async () => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem("accessToken")
            const data = new FormData()
            data.append("profile", Image)
            const res = await instance.patch("/users/update-profile", data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            if (res.data?.newImagePath) {
                setCurrentUser((prev: any) => ({
                    ...prev,
                    profile: res.data?.newImagePath
                }))
                setAlert({ msg: "Upload Profile", severity: "success" });
                setOpenToast(true)
            }
        } catch (error) {
            console.log(error)
            setAlert({ msg: error.message || "Something went wrong", severity: "error" });
            setOpenToast(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateProfileInfo = async () => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem("accessToken")
            const res = await instance.patch("/users", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            // console.log(res)
            setCurrentUser((prev: any) => ({
                ...prev,
                ...res.data.user
            }))
            if (res.data.user) {
                setAlert({ msg: "Update Profile Info", severity: "success" });
                setOpenToast(true)
            }
        } catch (error) {
            console.log(error)
            setAlert({ msg: error.response.data.error || "Something went wrong", severity: "error" });
            setOpenToast(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const promises = []

        if (Image) {
            promises.push(handleImageSubmit())
        }

        // Compare formData with CrruntUser to detect changes
        const infoChanged =
            formData.firstName !== CrruntUser.firstName ||
            formData.lastName !== CrruntUser.lastName ||
            formData.username !== CrruntUser.username

        if (infoChanged) {
            promises.push(handleUpdateProfileInfo())
        }

        try {
            await Promise.all(promises)
            // handleClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }


    React.useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])



    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                slots={{
                    transition: Transition,
                }}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Update Profile
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSubmit}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Stack alignItems={"center"} p={2}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <IconButton
                                size="small"
                                sx={{
                                    p: 0.5,
                                }}
                                onClick={() => inputRef.current?.click()}
                            >
                                <AddAPhoto fontSize="small" />
                            </IconButton>
                        }
                    >
                        <Avatar sx={{ height: "150px", width: "150px" }} src={IsLoading ? "..." : imagePreview || `http://localhost:3000${CrruntUser.profile}`} />
                        <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} hidden />
                    </Badge>
                </Stack>
                {
                    IsLoading ? (<Typography>
                        loading...
                    </Typography>) : (
                        <Stack p={3} spacing={3}>
                            <Stack>
                                <TextField placeholder='First Name' name='firstName' value={formData.firstName} onChange={handleChange} required />
                            </Stack>
                            <Stack>
                                <TextField placeholder='Last Name' name='lastName' value={formData.lastName} onChange={handleChange} required />
                            </Stack>
                            <Stack>
                                <TextField placeholder='username' name='username' value={formData.username} onChange={handleChange} required />
                            </Stack>
                        </Stack>
                    )
                }
            </Dialog>
            {alert && (
                <Snackbar msg={alert.msg} severity={alert.severity} onClose={handleClose} open={openToast} />
            )}
        </React.Fragment>
    );
}

export default ProfileDialog