import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Grid
} from "@mui/material";
import { ControlledTextField } from 'components/forms/ControlledTextField';
import { SnackBarAlertWarning } from 'components/forms/SnackBarAlert';

import { userStorage } from "userSession/userStorage";

import { HttpUser } from 'http/user/httpUser';

import { Administrator } from 'types/user/userType';
import { ResponseBase } from 'types/reponses/responsesType';

enum AdministratorFields {
    Nombre = 'nombre',
    Apellido = 'apellido',
    Email = 'email'
}

export function MyProfile () {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [msgError, setMsgError] = useState<string>();
    const [adminProfile, setAdminData] = useState<Administrator>();

    const {
        control,
        reset
    } = useForm<Administrator>({});

    useEffect(() => {
        reset({
            nombre: adminProfile?.nombre,
            apellido: adminProfile?.apellido,
            email: adminProfile?.email
        });
    }, [reset, adminProfile]);

    useEffect(() => {
        HttpUser.getAdminByEmail(userStorage.getUserMail())
            .then((response : ResponseBase<Administrator>) => {
                if (response.tieneError || response.data === null)
                    setMsgError(response.mensajeError)
                else 
                    setAdminData(response.data);

                setLoading(false);
            });
    }, []);

    return (
        <Box style={{ flexGrow: 1, }}>
            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                <Grid item xs={12}>
                    {userStorage.getFullName()}
                    <Divider />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card>
                        <CardHeader title="Datos Principales"></CardHeader>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ControlledTextField label="Nombre"
                                                        name={AdministratorFields.Nombre}
                                                        control={control}
                                                        disabled={true} />
                                </Grid>
                                <Grid item xs={12}>
                                    <ControlledTextField label="Apellido"
                                                        name={AdministratorFields.Apellido}
                                                        control={control}
                                                        disabled={true} />
                                </Grid>
                                <Grid item xs={12}>
                                    <ControlledTextField label="Email"
                                                        name={AdministratorFields.Email}
                                                        control={control}
                                                        disabled={true} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {
                isLoading
            }

            {
                !isLoading && msgError &&
                    <SnackBarAlertWarning message={msgError} />
            }
        </Box>
    );
}
/*
<Grid item xs={12} sm={12} md={6} lg={6}>
    <Card>
        <CardHeader title="Otros Datos"></CardHeader>
        <CardContent></CardContent>
    </Card>
</Grid>
*/