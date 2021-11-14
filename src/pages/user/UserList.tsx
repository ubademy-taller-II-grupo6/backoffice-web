import { useEffect, useState } from 'react';

import { Button, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';

import { SnackBarAlertSuccess } from 'components/forms/SnackBarAlert';
import { TableList } from 'components/table/Table';
import { TableColDef } from 'components/table/TableLayouts';
import { ChipActive, ChipBlocked } from 'components/chips/Chips';

import { User } from 'types/user/userType';
import { ResponseBase } from 'types/reponses/responsesType';

import { HttpUser } from 'http/users/httpUser';
import { UserChangeStateDialog } from './UserChangeStateDialog';

const orderUser = (oneUser : User, otherUser : User) : number => (oneUser.id > otherUser.id) ? 1 : -1;

export function UserList () {

    const [isLoading, setLoading] = useState<boolean>(true);
    const [listUsers, setListUsers] = useState<User[]>();
    const [changeStateUser, setChangeStateUser] = useState<User>();
    const [msgSuccess, setMsgSuccess] = useState<string>();

    const userListColDef : TableColDef[] = [
        { field: 'name', headerName: 'Nombre' },
        { field: 'lastname', headerName: 'Apellido' },
        { field: 'email', headerName: 'Mail' },
        { 
            field: 'blocked', headerName: 'Estado',
            renderSpecial: (oneUser: User) => (
                <div>
                    {
                        oneUser.blocked ?
                            <ChipBlocked />
                        :
                            <ChipActive />                          
                    }
                </div>
            )
        },
        { 
            field: 'changeState', headerName: ' ',
            renderSpecial: (oneUser: User) => (
                <Button variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => { 
                            setMsgSuccess(undefined);
                            setChangeStateUser(oneUser);
                        }}
                        sx={{zoom: '79%'}}
                        startIcon={<CompareArrowsRoundedIcon />}>Cambiar estado</Button>
            )
        }
    ]

    const searchUsers = () : Promise<ResponseBase<User[]>> => {
        return HttpUser.getListUsers();
    };

    const onReloadTable = () : void => {
        setLoading(true)
    };

    const onSaveChangeUser = () : void => {
        let msgFinal : string = `El usuario con mail ${changeStateUser?.email} fue ${changeStateUser?.blocked ? "activado" : "bloqueado"} exitosamente!`;
        setMsgSuccess(msgFinal);
        setChangeStateUser(undefined);
        onReloadTable();
    };

    useEffect(() => {
        if (isLoading)
            searchUsers()
                .then((response : ResponseBase<User[]>) => {
                    if (!response.tieneError && response.data !== null)
                        setListUsers(response.data.sort(orderUser));

                    setLoading(false);
                })
    }, [isLoading]);

    return (
        <Typography component="div">
            
            <Grid container spacing={3} >
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                    <CardHeader title="Usuarios"
                                action={
                                    <>
                                        <IconButton color="primary" sx={{ color: "#4a4a61"}} onClick={onReloadTable}>
                                            <SyncRoundedIcon />
                                        </IconButton>
                                    </>
                                } />
                </Grid>         
            </Grid>      
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <TableList loading={isLoading} dataList={listUsers} columnsDef={userListColDef} />
                </Grid>           
            </Grid>    

            {
                changeStateUser &&
                    <UserChangeStateDialog user={changeStateUser}
                                           onCloseDialog={() => setChangeStateUser(undefined)}
                                           onConfirmDialog={onSaveChangeUser}/>
            }     

            {
                msgSuccess &&
                    <SnackBarAlertSuccess message={msgSuccess} />
            }
        </Typography>
    );
}
