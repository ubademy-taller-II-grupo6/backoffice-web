import { useEffect, useState } from 'react';

import { CardHeader, Chip, Grid, IconButton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';

import { TableList } from 'components/table/Table';
import { TableColDef } from 'components/table/TableLayouts';

import { Administrator } from 'types/user/userType';
import { ResponseBase } from 'types/reponses/responsesType';

import { HttpAdmin } from 'http/admin/httpAdmin';

import { AdminDialog } from './AdminDialog';

export function AdminList () {

    const [isLoading, setLoading] = useState<boolean>(true);
    const [showAdminDialog, setShowAdminDialog] = useState<boolean>(false);
    const [listAdministrator, setListAdministrator] = useState<Administrator[]>();

    const adminListColDef : TableColDef[] = [
        { field: 'name', headerName: 'Nombre' },
        { field: 'surname', headerName: 'Apellido' },
        { field: 'email', headerName: 'Mail' },
        { 
            field: 'isblocked', headerName: 'Estado',
            renderSpecial: (oneAdministrator: Administrator) => (
                <div>
                    {
                        oneAdministrator.isblocked ?
                            <Chip label="Bloqueado" size="small" color="secondary" icon={<CloseRoundedIcon />} />
                        :
                            <Chip label="Activo" size="small" color="primary" icon={<CheckRoundedIcon />} />                          
                    }
                </div>
            )
        }
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
                                    <>
                                        <IconButton color="primary" sx={{ color: "#4a4a61"}} onClick={() => setShowAdminDialog(true)}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                        <IconButton color="primary" sx={{ color: "#4a4a61"}} onClick={onReloadTable}>
                                            <SyncRoundedIcon />
                                        </IconButton>
                                    </>
                                } />
                </Grid>         
            </Grid>      
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <TableList loading={isLoading} dataList={listAdministrator} columnsDef={adminListColDef} />
                </Grid>           
            </Grid>         

            {
                showAdminDialog &&
                    <AdminDialog onCloseDialog={() => setShowAdminDialog(false)} 
                                 onConfirmDialog={onReloadTable} />
            } 

        </Typography>
    );
}