import { Button, Grid, TextField, Typography } from '@material-ui/core';

export function LogIn () {
    return (
        <Typography component="div" style={{ textAlign: "center", marginTop: "10%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField label="Usuario" 
                               variant="outlined"
                               size="small"/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField label="Contraseña" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button variant="contained"
                            color="primary"
                            size="small">Ingresar</Button>
                </Grid>
            </Grid>
        </Typography>
    );
}