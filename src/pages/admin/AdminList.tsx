import { useEffect, useState } from 'react';
import { HttpAdmin } from 'http/admin/httpAdmin';
import { Administrator } from 'types/user/userType';
import { ResponseBase } from 'types/reponses/responsesType';
import { TableList, TableColDef } from 'components/table/Table';
import { Typography } from '@mui/material';

export function AdminList () {

    const [isLoading, setLoading] = useState<boolean>(true);
    const [listAdministrator, setListAdministrator] = useState<Administrator[]>();

    const adminListColDef : TableColDef[] = [
        { field: 'name', headerName: 'Nombre' },
        { field: 'surname', headerName: 'Apellido' },
        { field: 'email', headerName: 'Mail' },
        { field: 'isblocked', headerName: 'Estado' }
    ]

    const searchAdmins = () : Promise<ResponseBase<Administrator[]>> => {
        return HttpAdmin.getListAdmins();
    };

    useEffect(() => {
        setLoading(true);

        searchAdmins()
            .then((response : ResponseBase<Administrator[]>) => {
                if (!response.tieneError && response.data !== null)
                    setListAdministrator(response.data);

                setLoading(false);
            })
    }, []);

    return (
        <Typography component="div">                
            {
                !isLoading && !!listAdministrator && <TableList dataList={listAdministrator} columnsDef={adminListColDef} />
            }
        </Typography>
    );
}