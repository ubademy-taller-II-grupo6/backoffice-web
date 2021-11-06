import {
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

export interface TableColDef {
    field: string,
    headerName: string, 
    width?: number
}

interface TableListProps<T> {
    dataList: T[] | null | undefined,
    columnsDef: TableColDef[],
    loading: boolean
}

export function TableList<T> (props: TableListProps<T>) {
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {
                            props.columnsDef.map((oneColumnDef: TableColDef, index: number) => (
                                <TableCell key={`headerTableCell_${oneColumnDef.field}_${index}`} variant="head">{oneColumnDef.headerName}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {
                        props.loading &&
                            <TableRow>
                                <TableCell colSpan={props.columnsDef.length}>
                                        <LinearProgress />
                                </TableCell>
                            </TableRow>
                    }
                    {
                        !props.loading && !!props.dataList &&
                            props.dataList.map((data: any, index: number) => (
                                <TableRow key={`tableRow_${index}`}>
                                    {
                                        props.columnsDef.map((oneColumnDef : TableColDef) => (
                                            <TableCell key={`rowTableCell_${oneColumnDef.field}_${index}`}>{data[oneColumnDef.field]}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}