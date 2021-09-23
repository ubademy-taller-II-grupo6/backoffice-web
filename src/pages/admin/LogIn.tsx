import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core/styles';

import { Box, Button, Grid, Typography } from '@material-ui/core';
import { ControlledTextField } from 'components/forms/ControlledTextField';

import LogoUbademy from 'assets/images/logoUbademy.png';

const heightBox : number = 60;

const useStyles : any = makeStyles((theme: Theme) => createStyles({
    root: {
        textAlign: "-webkit-center",
        marginTop: "10% !important"    
    },
    contentForm: {
        paddingTop: 5,
        paddingBottom: 20,
        backgroundColor: "#E5E5E5"
    },
    imageLogoUbademy: {
        maxInlineSize: "-webkit-fill-available",
        zoom: "25%",
        marginTop: "-10%",
        marginBottom: "-10%"
    },
}));

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
    const classes = useStyles();

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
        <Grid container>
            <Grid container item xs={12}>
                <Grid item xs={3}>
                    <Box
                        sx={{
                            height: heightBox,
                            bgcolor: '#94C0C0',
                        }}></Box>
                </Grid>
                <Grid item xs={3}>
                    <Box
                        sx={{
                            height: heightBox,
                            bgcolor: '#FFBA67',
                        }}></Box>
                </Grid>
                <Grid item xs={3}>
                    <Box
                        sx={{
                            height: heightBox,
                            bgcolor: '#B3A580',
                        }}></Box>
                </Grid>
                <Grid item xs={3}>
                    <Box
                        sx={{
                            height: heightBox,
                            bgcolor: '#76CE86',
                        }}></Box>
                </Grid>
            </Grid>
            <Grid item xs={12}>                
                <Typography component="div" className={classes.root}>
                    <form onSubmit={handleSubmit(onLoginClick)}>
                        <Grid container spacing={2} item xs={12} sm={6} md={3} lg={3} className={classes.contentForm}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <img src={LogoUbademy} className={classes.imageLogoUbademy} alt="logoUbademy"></img>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ControlledTextField label="Usuario"
                                                    name={LogInFormFields.Usuario}
                                                    control={control} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ControlledTextField label="Contraseña"
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
                </Typography>
            </Grid>
        </Grid>
    ); 
}