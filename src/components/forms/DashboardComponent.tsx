import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, Skeleton  } from '@mui/material';

const useStyles : any = makeStyles((theme: Theme) => createStyles({
    contentTitle: {
        marginTop: '-12px'
    },
    title: {
        fontSize: '0.75rem',
        fontWeight: '600',
        letterSpacing: '0.5px',
        lineHeight: '2.5',
        textTransform: 'uppercase',
        color: "#65748B",
        marginTop: '-12px'
    },
    contentDescription: {
        marginBottom: '-15px'
    },
    description: {
        margin: 0,
        fontWeight: 700,
        fontSize: '2rem',
        color: "#121828"
    }
}));

interface DashboardComponentProps {
    title: string,
    description: string
}

export function DashboardComponent(props: DashboardComponentProps) {
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Grid container spacing={0} >
                    <Grid item xs={12} className={classes.contentTitle}>
                        <Typography component="span" className={classes.title} >
                            {props.title.toUpperCase()}
                        </Typography>
                    </Grid>     
                    <Grid item xs={12} className={classes.contentDescription}>
                        <Typography component="span" className={classes.description} >
                            {props.description}
                        </Typography>
                    </Grid>            
                </Grid>                 
            </CardContent>
        </Card>
    );
}

export function DashboardComponentLoading() {
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Grid container spacing={0} >
                    <Grid item xs={12} className={classes.contentTitle}>
                        <Skeleton variant="text" />
                    </Grid>     
                    <Grid item xs={12} className={classes.contentDescription}>
                        <Skeleton variant="text" />
                    </Grid>            
                </Grid>                 
            </CardContent>
        </Card>
    );
}
