import { useEffect, useState } from 'react';

import { CardHeader, Grid, IconButton, Typography } from '@mui/material';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';

import { TableList, TableColDef } from 'components/table/Table';

import { Administrator } from 'types/user/userType';
import { ResponseBase } from 'types/reponses/responsesType';

import { HttpAdmin } from 'http/admin/httpAdmin';

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

    const onReloadTable = () : void => {
        setLoading(true)
    };

    useEffect(() => {
        if (isLoading)
            searchAdmins()
                .then((response : ResponseBase<Administrator[]>) => {
                    if (!response.tieneError && response.data !== null)
                        setListAdministrator(response.data);

                    setLoading(false);
                })
    }, [isLoading]);

    return (
        <Typography component="div">
            
            <Grid container spacing={3} >
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                    <CardHeader title="Administradores"
                                action={
                                    <IconButton color="primary" sx={{ color: "#4a4a61"}} onClick={onReloadTable}>
                                        <SyncRoundedIcon />
                                    </IconButton>
                                } />
                </Grid>         
            </Grid>      
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <TableList loading={isLoading} dataList={listAdministrator} columnsDef={adminListColDef} />
                </Grid>           
            </Grid>          
        </Typography>
    );
}