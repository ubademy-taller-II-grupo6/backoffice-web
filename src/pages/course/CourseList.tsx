import { useEffect, useState } from 'react';

import { Button, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { ChipGold, ChipSilver, ChipBronze, ChipFree } from 'components/chips/Chips';
import { TableList } from 'components/table/Table';
import { TableColDef } from 'components/table/TableLayouts';

import { Course } from 'types/course/courseType';
import { ResponseBase } from 'types/reponses/responsesType';

import { HttpCourse } from 'http/course/httpCourse';
import { CourseDetailDialog } from './CourseDetailDialog';

export function CourseList () {

    const [isLoading, setLoading] = useState<boolean>(true);
    const [listCourses, setListCourses] = useState<Course[]>();
    const [courseDetail, setCourseDetail] = useState<Course>();

    const courseListColDef : TableColDef[] = [
        { field: 'title', headerName: 'Título' },
        { 
            field: 'description', headerName: 'Descripción',
            renderSpecial: (oneCourse: Course) => (
                <div>
                    {
                        oneCourse.description.length > 25 ?
                            `${oneCourse.description.substring(0, 25)}... `
                        :
                            oneCourse.description.substring(0, 25)
                    }
                </div>
            )
        },
        { field: 'type', headerName: 'Tipo' },
        { field: 'category', headerName: 'Categoría' },
        { 
            field: 'subscription', headerName: 'Subscrición',
            renderSpecial: (oneCourse: Course) => (
                <div>
                    {(() => {
                        switch(oneCourse.subscription) {
                            case 'GOLD':
                                return <ChipGold />
                            case 'SILVER':
                                return <ChipSilver />
                            case 'BRONZE':
                                return <ChipBronze />
                            case 'FREE':
                                return <ChipFree />
                        }
                    })()}
                    
                </div>
            )
        },
        { field: 'location', headerName: 'Ubicación' },
        { 
            field: 'changeState', headerName: ' ',
            renderSpecial: (oneCourse: Course) => (
                <Button variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => { setCourseDetail(oneCourse) }}
                        sx={{zoom: '79%'}}
                        startIcon={<SearchRoundedIcon />}>Ver Detalle</Button>
            )
        }
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

            {
                courseDetail && <CourseDetailDialog course={courseDetail} onCloseDialog={() => setCourseDetail(undefined)} />
            }
        </Typography>
    );
}
