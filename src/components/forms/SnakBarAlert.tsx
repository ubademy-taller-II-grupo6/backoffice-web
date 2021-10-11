import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackBarAlertProps {
    message: string;
}

interface SnackBarAlertComponentProps extends SnackBarAlertProps {
    severity: AlertColor;
} 

function SnackBarAlert (props: SnackBarAlertComponentProps) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    return (
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity={props.severity} >
            {props.message}
          </Alert>
        </Snackbar>
      </div>
    );
}

export function SnackBarAlertSuccess(props: SnackBarAlertProps) {
    return (
        <SnackBarAlert message={props.message} severity="success" />
    );
}

export function SnackBarAlertWarning(props: SnackBarAlertProps) {
    return (
        <SnackBarAlert message={props.message} severity="warning" />
    );
}

export function SnackBarAlertError(props: SnackBarAlertProps) {
    return (
        <SnackBarAlert message={props.message} severity="error" />
    );
}