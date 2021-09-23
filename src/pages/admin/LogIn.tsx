import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core/styles';

import { Button, Grid, Typography } from '@material-ui/core';
import { ControlledTextField } from 'components/forms/ControlledTextField';

const useStyles : any = makeStyles((theme: Theme) => createStyles({
    root: {
        textAlign: "-webkit-center",
        marginTop: "15% !important"    
    },
    contentForm: {
        paddingTop: 5,
        paddingBottom: 20,
        backgroundColor: "#E5E5E5"
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
            <Typography component="div" className={classes.root}>
                <form onSubmit={handleSubmit(onLoginClick)}>
                    <Grid container spacing={2} item xs={12} sm={6} md={3} lg={3} className={classes.contentForm}>
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
    ); 
}