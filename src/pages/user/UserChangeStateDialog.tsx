import { useState} from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from '@mui/material';

import { LoaderBackdrop } from 'components/loader/LoaderBackdrop';

import { User } from 'types/user/userType';

import { HttpUser } from 'http/users/httpUser';

interface UserChangeStateDialogProps {
    user: User,
    onCloseDialog: () => void,
    onConfirmDialog: () => void
}

export function UserChangeStateDialog (props: UserChangeStateDialogProps) {
    const [open, setOpen] = useState<boolean>(true);
    const [isSaving, setSaving] = useState<boolean>(false);
    
    const titleFinal : string = "Atención!";
    const textContentFinal : string = `Realmente quiere ${props.user.blocked ? "activar" : "bloquear"} el usuario con mail ${props.user.email}?`;

    const onHandleClose = () => {
        setOpen(false);
        props.onCloseDialog();
    };
    
    const onHandleConfirm = async () => {
        setSaving(true);

        if (props.user.blocked) {
            await HttpUser.activateUser(props.user)
                    .then(() => {
                        setOpen(false);
                        setSaving(false);
                        props.onConfirmDialog();
                    })
        } else {
            await HttpUser.blockUser(props.user)
                    .then(() => {
                        setOpen(false);
                        setSaving(false);
                        props.onConfirmDialog();
                    })
        }
    };

    return (
        <Typography component="div">
            <Dialog open={open} 
                    onClose={onHandleClose} 
                    aria-labelledby="form-dialog-title" 
                    fullWidth={true}>

                <DialogTitle>{titleFinal}</DialogTitle>

                <DialogContent sx={{ marginTop: '10px'}}>
                    <DialogContentText>{textContentFinal}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={onHandleClose}>Cancelar</Button>
                    
                    <Button variant="contained"
                            color="primary"
                            size="small"
                            onClick={onHandleConfirm}>Confirmar</Button>
                </DialogActions>
            </Dialog>

            {
                isSaving &&
                    <LoaderBackdrop />
            }
        </Typography>
    );
}