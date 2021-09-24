import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Grid } from '@material-ui/core';
import { ControlledTextField } from 'components/forms/ControlledTextField';

import { AccountLayoutAdmin } from 'layouts/AccountLayoutAdmin';

enum LogInFormFields {
    Usuario = 'Usuario',
    Contraseña = 'Contraseña'
}

const LogInFormSchema = yup.object().shape({
    [LogInFormFields.Usuario]: yup.string().email('El campo debe ser un mail válido').required('Campo obligatorio'),
    [LogInFormFields.Contraseña]: yup.string().required('Campo obligatorio')
})

type LogInFormData = yup.InferType<typeof LogInFormSchema>;

export function LogIn () {

    const {
        control,
        handleSubmit
    } = useForm<LogInFormData>({
        resolver: yupResolver(LogInFormSchema),
    });

    const onLoginClick = (data: LogInFormData) : void => {
        alert(`Ingresaste ${data.Usuario}!`);
    };

    return (
        <AccountLayoutAdmin>
            <form onSubmit={handleSubmit(onLoginClick)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ControlledTextField label="Usuario"
                                            name={LogInFormFields.Usuario}
                                            control={control} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ControlledTextField label="Contraseña"
                                            type='password'
                                            name={LogInFormFields.Contraseña}
                                            control={control} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button variant="contained"
                                color="primary"
                                size="small"
                                type="submit">Ingresar</Button>
                    </Grid>
                </Grid>
            </form>
        </AccountLayoutAdmin>
    ); 
}