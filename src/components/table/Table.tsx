import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from '@mui/material';
import { TableColDef, TableHeader, TableRowBodyEmpty, TableRowLoading } from './TableLayouts';

interface TableListProps<T> {
    dataList: T[] | null | undefined,
    columnsDef: TableColDef[],
    loading: boolean
}

export function TableList<T> (props: TableListProps<T>) {
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHeader columnsDef={props.columnsDef} />
                
                <TableBody>
                    {
                        (props.loading) || (!props.dataList) ?
                            <TableRowLoading colSpan={props.columnsDef.length} />
                        :
                            props.dataList.length ?
                                props.dataList.map((data: any, index: number) => (
                                    <TableRow key={`tableRow_${index}`}>
                                        {
                                            props.columnsDef.map((oneColumnDef : TableColDef) => (
                                                oneColumnDef.renderSpecial ?
                                                <TableCell key={`rowTableCell_${oneColumnDef.field}_${index}`}>{oneColumnDef.renderSpecial(data)}</TableCell>
                                                :
                                                <TableCell key={`rowTableCell_${oneColumnDef.field}_${index}`}>{data[oneColumnDef.field]}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            :
                                <TableRowBodyEmpty colSpan={props.columnsDef.length} />
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}