import { useState } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Grid } from '@material-ui/core';
import { ControlledTextField } from 'components/forms/ControlledTextField';
import { LoaderBackdrop } from 'components/loader/LoaderBackdrop';

import { AccountLayoutAdmin } from 'layouts/AccountLayoutAdmin';
import { HttpUser } from 'http/user/httpUser';
import { userStorage } from 'userSession/userStorage';
import { UserSession } from 'types/user/userType';

enum LogInFormFields {
    Email = 'Email',
    Contraseña = 'Contraseña'
}

const LogInFormSchema = yup.object().shape({
    [LogInFormFields.Email]: yup.string().email('El campo debe ser un mail válido').required('Campo obligatorio'),
    [LogInFormFields.Contraseña]: yup.string().required('Campo obligatorio')
})

type LogInFormData = yup.InferType<typeof LogInFormSchema>;

export function LogIn () {
    const [isLoading, setLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit
    } = useForm<LogInFormData>({
        resolver: yupResolver(LogInFormSchema),
    });

    async function onLoginClick (data: LogInFormData)  {
        setLoading(true);

        let response : UserSession = await HttpUser.loginUser(data.Email, data.Contraseña);

        userStorage.logInUser(response.nombre, response.apellido, response.email);

        setLoading(false);

        window.location.href = "/"; // Redirecciona a la pagina de inicio
    }

    return (
        <AccountLayoutAdmin>
            <form onSubmit={handleSubmit(onLoginClick)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ControlledTextField label="Usuario"
                                            name={LogInFormFields.Email}
                                            control={control} />
                    </Grid>
                    <Grid item xs={12}>
                        <ControlledTextField label="Contraseña"
                                            type='password'
                                            name={LogInFormFields.Contraseña}
                                            control={control} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained"
                                color="primary"
                                size="small"
                                type="submit">Ingresar</Button>
                    </Grid>
                </Grid>
            </form>

            {
                isLoading &&
                    <LoaderBackdrop />
            }
        </AccountLayoutAdmin>
    ); 
}