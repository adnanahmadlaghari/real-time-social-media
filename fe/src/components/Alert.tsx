import * as React from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
    msg: string,
    severity: "error" | "warning" | "info" | "success",
    open: boolean;
    onClose: () => void;
}

const Snackbar: React.FC<Props> = ({ msg, severity, open, onClose }) => {

    return (
        <div>
            <MuiSnackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                variant="filled" sx={{ width: '100%' }}
                    onClose={onClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </MuiSnackbar>
        </div>
    );
}

export default Snackbar
