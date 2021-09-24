import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Grid } from '@material-ui/core';
import { ControlledTextField } from 'components/forms/ControlledTextField';

import { AccountLayoutAdmin } from 'layouts/AccountLayoutAdmin';

enum RecoverPasswordFormFields {
    Usuario = 'Usuario',
    Contraseña = 'Contraseña',
    RepetirContraseña = 'RepetirContraseña'
}

const RecoverPasswordFormSchema = yup.object().shape({
    [RecoverPasswordFormFields.Usuario]: yup.string().email('El campo debe ser un mail válido').required('Campo obligatorio'),
    [RecoverPasswordFormFields.Contraseña]: yup.string().required('Campo obligatorio'),
    [RecoverPasswordFormFields.RepetirContraseña]: yup.string().required('Campo obligatorio')
})

type RecoverPasswordFormData = yup.InferType<typeof RecoverPasswordFormSchema>;

export function RecoverPassword () {

    const {
        control,
        handleSubmit
    } = useForm<RecoverPasswordFormData>({
        resolver: yupResolver(RecoverPasswordFormSchema),
    });

    const onRecoverPasswordClick = (data: RecoverPasswordFormData) : void => {
        alert(`Cambiaste la clave ${data.Usuario}!`);
    };

    return (
        <AccountLayoutAdmin>
            <form onSubmit={handleSubmit(onRecoverPasswordClick)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ControlledTextField label="Usuario"
                                            name={RecoverPasswordFormFields.Usuario}
                                            control={control} />
                    </Grid>
                    <Grid item xs={12}>
                        <ControlledTextField label="Contraseña"
                                            type='password'
                                            name={RecoverPasswordFormFields.Contraseña}
                                            control={control} />
                    </Grid>
                    <Grid item xs={12}>
                        <ControlledTextField label="Repetir Contraseña"
                                            type='password'
                                            name={RecoverPasswordFormFields.RepetirContraseña}
                                            control={control} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained"
                                color="primary"
                                size="small"
                                type="submit">Cambiar Constraseña</Button>
                    </Grid>
                </Grid>
            </form>
        </AccountLayoutAdmin>
    );     
}
