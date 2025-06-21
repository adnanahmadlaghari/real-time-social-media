import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import { Stack, TextField } from '@mui/material';
import { useGlobalVar } from './Global/Global';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogProps {
    open: boolean,
    handleClose: () => void
    edit: () => void
}

const PostUpdateDialog: React.FC<DialogProps> = ({ open, handleClose, edit}) => {

    const {title, content, setTitle, setContent} = useGlobalVar()

    return (
        <React.Fragment>
            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
            >
                <DialogTitle>{"Update Post"}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <Stack>
                            <TextField fullWidth placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </Stack>
                        <Stack>
                            <TextField fullWidth multiline maxRows={10} placeholder='content' value={content} onChange={(e) => setContent(e.target.value)}/>
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={edit}>Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default PostUpdateDialog