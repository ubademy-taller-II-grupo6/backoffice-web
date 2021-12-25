import { useEffect, useState } from 'react';

import { CardHeader, Grid, IconButton, Typography } from '@mui/material';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';

import { TableList } from 'components/table/Table';
import { TableColDef } from 'components/table/TableLayouts';

import { Course } from 'types/course/courseType';
import { ResponseBase } from 'types/reponses/responsesType';

import { HttpCourse } from 'http/course/httpCourse';

export function CourseList () {

    const [isLoading, setLoading] = useState<boolean>(true);
    const [listCourses, setListCourses] = useState<Course[]>();

    const courseListColDef : TableColDef[] = [
        { field: 'title', headerName: 'Título' },
        { field: 'description', headerName: 'Descripción' },
        { field: 'type', headerName: 'Tipo' },
        { field: 'category', headerName: 'Categoría' },
        { field: 'subscription', headerName: 'Subscrición' },
        { field: 'location', headerName: 'Ubicación' },
    ]

    const searchCourses = () : Promise<ResponseBase<Course[]>> => {
        return HttpCourse.getListCourses();
    };

    const onReloadTable = () : void => {
        setLoading(true)
    };

    useEffect(() => {
        if (isLoading)
            searchCourses()
                .then((response : ResponseBase<Course[]>) => {
                    if (!response.tieneError && response.data !== null)
                        setListCourses(response.data);

                    setLoading(false);
                })
    }, [isLoading]);

    return (
        <Typography component="div">
            
            <Grid container spacing={3} >
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                    <CardHeader title="Cursos"
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
                    <TableList loading={isLoading} dataList={listCourses} columnsDef={courseListColDef} />
                </Grid>           
            </Grid>    
        </Typography>
    );
}
