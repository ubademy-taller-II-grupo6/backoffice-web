import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles : any = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: 100000,
            color: '#3498db',
            backgroundColor: 'rgba(0,0,0, 0.6)',
            borderTop: '2px solid #3498db'
        },
    }),
);

export function LoaderBackdrop() { 
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={true} >
            <CircularProgress color="inherit" size={100}/>
        </Backdrop>
    );
}
