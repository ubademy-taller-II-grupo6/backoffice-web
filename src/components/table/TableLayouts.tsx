import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core/styles';

import {
    Alert,
    AlertTitle,
    Grid,
    LinearProgress,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';        

const useStyles : any = makeStyles((theme: Theme) => createStyles({
    tableOverlay: {
        justifyContent: "center",
        paddingTop: "20px",
        paddingBottom: "20px"
    },
    alertTable: {
        '& .MuiAlert-message': {
            paddingRight: "20px"
        }
    }
}));

export interface TableColDef {
    field: string,
    headerName: string, 
    width?: number
}

interface TableRowLoadingProps {
    colSpan: number
}

export function TableRowLoading (props: TableRowLoadingProps) {
    return (
        <TableRow>
            <TableCell colSpan={props.colSpan}>
                    <LinearProgress />
            </TableCell>
        </TableRow>
    );
}

interface TableHeaderProps {
    columnsDef: TableColDef[]
}

export function TableHeader (props: TableHeaderProps) {
    return (
        <TableHead>
            <TableRow>
                {
                    props.columnsDef.map((oneColumnDef: TableColDef, index: number) => (
                        <TableCell key={`headerTableCell_${oneColumnDef.field}_${index}`} variant="head">
                            { oneColumnDef.headerName }
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
}

interface TableRowBodyEmptyProps {
    colSpan: number
}

export function TableRowBodyEmpty (props: TableRowBodyEmptyProps) {
    const classes = useStyles();

    return (
        <TableRow>
            <TableCell colSpan={props.colSpan}>
                <Grid container className={classes.tableOverlay}>
                    <Grid item xs={9} sm={9} md={5} lg={4} >
                        <Alert severity="info" className={classes.alertTable}>
                            <AlertTitle>Atención!</AlertTitle>
                            No se han encontrado datos
                        </Alert>        
                    </Grid>
                </Grid>
            </TableCell>
        </TableRow>
    );
}