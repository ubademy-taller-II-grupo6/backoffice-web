import { useState} from 'react';

import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import { ControlledTextField, ControlledTextFieldPassword } from 'components/forms/ControlledTextField';
import { SnackBarAlertSuccess, SnackBarAlertWarning } from 'components/forms/SnackBarAlert';
import { LoaderBackdrop } from 'components/loader/LoaderBackdrop';

import { ResponseBase } from 'types/reponses/responsesType';
import { Administrator } from "types/user/userType";

import { HttpAdmin } from 'http/admin/httpAdmin';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseUtils } from 'utils/firebaseUtils';

enum AdminDialogFormFields {
    Name = 'name',
    Surname = 'surname',
    Email = 'email',
    Password = 'password',
    PasswordRepeat = 'passwordRepeat'
}

interface AdminDialogProps {
    administrator?: Administrator,
    onCloseDialog: () => void,
    onConfirmDialog: () => void
}

export function AdminDialog (props: AdminDialogProps) {

    const [open, setOpen] = useState<boolean>(true);
    const [msgError, setMsgError] = useState<string>();
    const [mailSaveAdmin, setMailSaveAdmin] = useState<string>();
    const [isSaving, setSaving] = useState<boolean>(false);

    const isNewAdmin : boolean = !props.administrator;
    const titleDialog : string = isNewAdmin ? "Nuevo Administrador" : `${props.administrator?.name} ${props.administrator?.surname}`;

    const AdminDialogFormSchema = 
        isNewAdmin ? 
            yup.object().shape({
                [AdminDialogFormFields.Name]: yup.string().required('Campo obligatorio'),
                [AdminDialogFormFields.Surname]: yup.string().required('Campo obligatorio'),
                [AdminDialogFormFields.Email]: yup.string().email('El campo debe ser un mail válido').required('Campo obligatorio'),
                [AdminDialogFormFields.Password]: yup.string().required('Campo obligatorio').min(6, 'La contraseña debe tener 6 caracteres como mínimo'),
                [AdminDialogFormFields.PasswordRepeat]: yup.string().required('Campo obligatorio')
                                                            .min(6, 'La contraseña debe tener 6 caracteres como mínimo')
                                                            .oneOf([yup.ref(AdminDialogFormFields.Password), null], 'Las constraseñas no coinciden')
            })    
        :
            yup.object().shape({
                [AdminDialogFormFields.Name]: yup.string().required('Campo obligatorio'),
                [AdminDialogFormFields.Surname]: yup.string().required('Campo obligatorio'),
                [AdminDialogFormFields.Email]: yup.string().email('El campo debe ser un mail válido').required('Campo obligatorio'),
                [AdminDialogFormFields.Password]: yup.string().required('Campo obligatorio').min(6, 'La contraseña debe tener 6 caracteres como mínimo')
            })

    
    
    type AdminDialogFormData = yup.InferType<typeof AdminDialogFormSchema>;

    const {
        control,
        handleSubmit
    } = useForm<AdminDialogFormData>({
        defaultValues: {
            name: props.administrator?.name || "",
            surname: props.administrator?.surname || "",
            email: props.administrator?.email || "",
        } as AdminDialogFormData,
        resolver: yupResolver(AdminDialogFormSchema, { abortEarly: false }),
    });

    const onHandleClose = () => {
        setOpen(false);
        props.onCloseDialog();
    };
    
    const onHandleSubmit = () => {
        onHandleClose();
        props.onConfirmDialog();
    };

    async function onSaveAdmin (data: AdminDialogFormData)  {
        setSaving(true);
        setMsgError(undefined);
        setMailSaveAdmin(undefined);

        try {
            const auth = getAuth(); 
            await createUserWithEmailAndPassword(auth, data.email, data.password);

            let newAdministrator : Administrator = {
                name: data.name,
                surname: data.surname,
                email: data.email,
                isblocked: false
            } as Administrator;

            let response : ResponseBase<Administrator> = await HttpAdmin.createNewAdmin(newAdministrator);

            if ((response.tieneError) || (response.data === null)) {
                setMsgError(response.mensajeError);
            } else {
                let dataAdministrator : Administrator = response.data;
                setMailSaveAdmin(dataAdministrator.email);
                onHandleSubmit();
            }

            setSaving(false);

        } catch (error : any) {
            var errorMessage = firebaseUtils.decodeMessageError(error.code);
            setMsgError(errorMessage);
            setSaving(false);
        }
    };
    
    return (
        <Typography component="div">
            <Dialog open={open}
                    onClose={onHandleClose}
                    maxWidth="sm">
                <DialogTitle>{titleDialog}</DialogTitle>
                <form onSubmit={handleSubmit(onSaveAdmin)}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid container spacing={3} item>
                                <Grid item xs={12} sm={12} md={6} lg={6} >
                                    <ControlledTextField label="Nombre"
                                                        name={AdminDialogFormFields.Name}
                                                        fullWidth
                                                        control={control} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <ControlledTextField label="Apellido"
                                                        name={AdminDialogFormFields.Surname}
                                                        fullWidth
                                                        control={control} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <ControlledTextField label="Mail"
                                                        name={AdminDialogFormFields.Email}
                                                        fullWidth
                                                        control={control} />
                                </Grid>
                            </Grid>
                            
                            {
                                isNewAdmin && 
                                    <Grid container spacing={3} item>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <ControlledTextFieldPassword label="Contraseña"
                                                                name={AdminDialogFormFields.Password}
                                                                fullWidth
                                                                control={control} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <ControlledTextFieldPassword label="Repetir Contraseña"
                                                                name={AdminDialogFormFields.PasswordRepeat}
                                                                fullWidth
                                                                control={control} />
                                        </Grid>
                                    </Grid>
                            }

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined"
                                color="secondary"
                                size="small"
                                onClick={onHandleClose}
                                startIcon={<CloseRoundedIcon />}>Cancelar</Button>

                        {
                            isNewAdmin &&   
                                <Button variant="contained"
                                        color="primary"
                                        size="small"
                                        type="submit"
                                        startIcon={<SaveRoundedIcon />}>Guardar</Button>
                        }
                    </DialogActions>
                </form>
            </Dialog>

            {
                mailSaveAdmin &&
                    <SnackBarAlertSuccess message={`El administrador con mail ${mailSaveAdmin} fue creado exitosamente!`} />
            }

            {
                msgError && 
                    <SnackBarAlertWarning message={msgError} />
            }

            {
                isSaving &&
                    <LoaderBackdrop />
            }
        </Typography>
    );
}