import { ReactNode } from 'react';
import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core';
import { ContentLayoutBox } from './components/ContentLayoutBox';
import LogoUbademy from 'assets/images/logoUbademy.png';

const useStyles : any = makeStyles((theme: Theme) => createStyles({
    root: {
        textAlign: "-webkit-center",
        marginTop: "10% !important"    
    },
    contentForm: {
        paddingTop: 5,
        paddingBottom: 20,
        backgroundColor: "#E5E5E5",
        justifyContent: "center",
        borderRadius: 17
    },
    imageLogoUbademy: {
        maxInlineSize: "-webkit-fill-available",
        zoom: "25%",
        marginTop: "-10%",
        marginBottom: "-10%"
    },
}));

interface AccountLayoutAdminProps {
    children: ReactNode
}

export function AccountLayoutAdmin (props: AccountLayoutAdminProps) {
    const classes = useStyles();

    return (
        <Grid container>
            <ContentLayoutBox />
            <Grid item xs={12}>                
                <Typography component="div" className={classes.root}>
                        <Grid container spacing={2} item xs={12} sm={6} md={3} lg={3} className={classes.contentForm}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <img src={LogoUbademy} className={classes.imageLogoUbademy} alt="logoUbademy"></img>
                            </Grid>
                            { props.children }
                        </Grid>
                </Typography>
            </Grid>
        </Grid>
    );
}
