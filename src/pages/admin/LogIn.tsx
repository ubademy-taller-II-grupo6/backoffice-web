import { useState } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

import { Button, Grid } from '@material-ui/core';
import { ControlledTextField, ControlledTextFieldPassword } from 'components/forms/ControlledTextField';
import { LoaderBackdrop } from 'components/loader/LoaderBackdrop';

import { AccountLayoutAdmin } from 'layouts/AccountLayoutAdmin';
import { HttpAdmin } from 'http/admin/httpAdmin';
import { userStorage } from 'userSession/userStorage';
import { Administrator } from 'types/user/userType';
import { ResponseBase } from 'types/reponses/responsesType';
import { SnackBarAlertWarning } from 'components/forms/SnackBarAlert';
import { firebaseUtils } from 'utils/firebaseUtils';

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
    const [msgError, setMsgError] = useState<string>();

    const {
        control,
        handleSubmit
    } = useForm<LogInFormData>({
        resolver: yupResolver(LogInFormSchema),
    });

    async function getAdmin (adminEmail : string, adminToken : string) {
        let response : ResponseBase<Administrator> = await HttpAdmin.getAdminByEmail(adminEmail);

        if ((response.tieneError) || (response.data === null)) {
            setLoading(false);
            setMsgError(response.mensajeError);
        } else {
            let dataAdministrator : Administrator = response.data;
            userStorage.logInUser(dataAdministrator.name, dataAdministrator.surname, dataAdministrator.email, adminToken);
    
            setLoading(false);
    
            window.location.href = "/backoffice-web/"; // Redirecciona a la pagina de inicio
        } 
    }

    async function onLoginClick (data: LogInFormData)  {
        setLoading(true);
        setMsgError(undefined);
        
        try {
            const auth = getAuth(); 
            let userCredential : UserCredential = await signInWithEmailAndPassword(auth, data.Email, data.Contraseña);
            let userToken : string = await userCredential.user.getIdToken();

            await getAdmin(data.Email, userToken);
        } catch (error : any) {
            var errorMessage = firebaseUtils.decodeMessageError(error.code);
            setMsgError(errorMessage);
            setLoading(false);
        }
    }

    return (
        <AccountLayoutAdmin>
            <form onSubmit={handleSubmit(onLoginClick)}>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={9}>
                        <ControlledTextField label="Usuario"
                                            name={LogInFormFields.Email}
                                            fullWidth
                                            control={control} />
                    </Grid>
                    <Grid item xs={9}>
                        <ControlledTextFieldPassword label="Contraseña"
                                                    name={LogInFormFields.Contraseña}
                                                    fullWidth
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

            {
                msgError &&
                    <SnackBarAlertWarning message={msgError} />
            }

        </AccountLayoutAdmin>
    ); 
}
