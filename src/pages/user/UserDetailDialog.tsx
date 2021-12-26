import { useState} from 'react';

import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { User } from "types/user/userType";
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface UserDetailDialogProps {
    user: User,
    onCloseDialog: () => void,
}

export function UserDetailDialog (props: UserDetailDialogProps) {

    const [open, setOpen] = useState<boolean>(true);
    const titleDialog : string = `${props.user.name} ${props.user.lastname}`;


    const onHandleClose = () => {
        setOpen(false);
        props.onCloseDialog();
    };
    
    return (
        <Typography component="div">
            <Dialog open={open}
                    onClose={onHandleClose}
                    fullWidth
                    maxWidth="sm">
                <DialogTitle>{titleDialog.toUpperCase()}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} style={{marginTop: 8}}>
                        <Grid container spacing={3} item>
                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                <TextField
                                    size="small"
                                    label="Nombre"
                                    value={props.user.name}
                                    fullWidth
                                    disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                <TextField
                                    size="small"
                                    label="Apellido"
                                    value={props.user.lastname}
                                    fullWidth
                                    disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                <TextField
                                    size="small"
                                    label="Mail"
                                    value={props.user.email}
                                    fullWidth
                                    disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                <TextField
                                    size="small"
                                    label="Subscripción"
                                    value={props.user.subscription}
                                    fullWidth
                                    disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                {
                                    props.user.blocked ?
                                    <FormControlLabel disabled control={<Checkbox checked={true} />} label="Bloqueado" />
                                    :
                                    <FormControlLabel disabled control={<Checkbox checked={true} />} label="Activo" />
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={onHandleClose}
                            startIcon={<CloseRoundedIcon />}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </Typography>
    );
}