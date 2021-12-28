import { useEffect, useState } from 'react';

import { CardHeader, Grid, Typography } from '@mui/material';
import { DashboardComponent, DashboardComponentLoading } from 'components/forms/DashboardComponent';

import { User } from 'types/user/userType';

import { HttpUser } from 'http/users/httpUser';
import { HttpCourse } from 'http/course/httpCourse';
import { Course } from 'types/course/courseType';

interface MetricsBySubscription {
    goldQuantity: number,
    silverQuantity: number,
    bronzeQuantity: number,
    freeQuantity: number,
}

interface UserMetrics {
    userQuantity: number,
    userBlockedQuantity: number,
    userMetricsBySubscription: MetricsBySubscription
}

interface CourseMetrics {
    courseQuantity: number,
    courseMetricsBySubscription: MetricsBySubscription
}

export function Home() {

    const [isLoading, setLoading] = useState<boolean>(true);
    const [metrics, setMetrics] = useState<UserMetrics>();
    const [metricsCourse, setMetricsCourse] = useState<CourseMetrics>();

    const calculateMetrics = (lstUsers: User[]) : void => {
        let auxMetrics : UserMetrics = {
            userQuantity: 0,
            userBlockedQuantity: 0,
            userMetricsBySubscription: {
                goldQuantity: 0,
                silverQuantity: 0,
                bronzeQuantity: 0,
                freeQuantity: 0
            }
        } as UserMetrics;

        auxMetrics.userQuantity = lstUsers.length;
        auxMetrics.userBlockedQuantity = lstUsers.filter(x => x.blocked).length;

        auxMetrics.userMetricsBySubscription.goldQuantity = lstUsers.filter(x => x.subscription === 'GOLD').length;
        auxMetrics.userMetricsBySubscription.silverQuantity = lstUsers.filter(x => x.subscription === 'SILVER').length;
        auxMetrics.userMetricsBySubscription.bronzeQuantity = lstUsers.filter(x => x.subscription === 'BRONZE').length;
        auxMetrics.userMetricsBySubscription.freeQuantity = lstUsers.filter(x => x.subscription === 'FREE').length;

        setMetrics(auxMetrics);
    };

    const calculateMetricsCourses = (lstCourses: Course[]) : void => {
        let auxMetrics : CourseMetrics = {
            courseQuantity: 0,
            courseMetricsBySubscription: {
                goldQuantity: 0,
                silverQuantity: 0,
                bronzeQuantity: 0,
                freeQuantity: 0
            }
        } as CourseMetrics;

        auxMetrics.courseQuantity = lstCourses.length;

        auxMetrics.courseMetricsBySubscription.goldQuantity = lstCourses.filter(x => x.subscription === 'GOLD').length;
        auxMetrics.courseMetricsBySubscription.silverQuantity = lstCourses.filter(x => x.subscription === 'SILVER').length;
        auxMetrics.courseMetricsBySubscription.bronzeQuantity = lstCourses.filter(x => x.subscription === 'BRONZE').length;
        auxMetrics.courseMetricsBySubscription.freeQuantity = lstCourses.filter(x => x.subscription === 'FREE').length;

        setMetricsCourse(auxMetrics);
    };
    
    useEffect(() => {
        setLoading(true);

        Promise.all([
            HttpUser.getListUsers(),
            HttpCourse.getListCourses()
        ])
        .then((values) => {
            if (!values[0].tieneError && values[0].data !== null)
                calculateMetrics(values[0].data);
                
            if (!values[1].tieneError && values[1].data !== null)
                calculateMetricsCourses(values[1].data);
            
            setLoading(false);
        })
    }, []);
    
    return (
        <Typography component="div">
            {
                isLoading && 
                <Typography component="div">
                    <Grid container spacing={3} >
                        <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                            <CardHeader title="Usuarios" />
                        </Grid>         
                    </Grid>    
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardComponentLoading />
                        </Grid>     
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardComponentLoading />
                        </Grid>          
                    </Grid>                         
                    
                    <Grid container spacing={3} >
                        <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                            <CardHeader title="Usuarios por Subscripción" />
                        </Grid>         
                    </Grid>    
                    <Grid container spacing={3} >  
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardComponentLoading />
                        </Grid>       
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardComponentLoading />
                        </Grid>  
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardComponentLoading />
                        </Grid>  
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardComponentLoading />
                        </Grid>     
                    </Grid>
                </Typography>
            }
            {
                isLoading && 
                <Typography component="div">
                    <Grid container spacing={3} >
                        <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                            <CardHeader title="Cursos" />
                        </Grid>         
                    </Grid>                        
                    
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={6} md={3} lg={3} sx={{ marginBottom: "10px" }}>
                            <DashboardComponentLoading />
                        </Grid>         
                    </Grid>   
                      
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardComponentLoading />
                        </Grid>       
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardComponentLoading />
                        </Grid>  
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardComponentLoading />
                        </Grid>  
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardComponentLoading />
                        </Grid>     
                    </Grid>
                </Typography>
            }
            {
                !isLoading && metrics &&
                    <Typography component="div">
                        <Grid container spacing={3} >
                            <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                                <CardHeader title="Usuarios" />
                            </Grid>         
                        </Grid>    
                        <Grid container spacing={3} >
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <DashboardComponent title="Usuarios Totales"
                                                    description={`${metrics.userQuantity}`}/>
                            </Grid>     
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <DashboardComponent title="Usuarios Bloqueados"
                                                    description={`${metrics.userBlockedQuantity}`}/>
                            </Grid>          
                        </Grid>                         
                        
                        <Grid container spacing={3} >
                            <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                                <CardHeader title="Usuarios por Subscripción" />
                            </Grid>         
                        </Grid>    
                        <Grid container spacing={3} >  
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <DashboardComponent title="Gold"
                                                    description={`${metrics.userMetricsBySubscription.goldQuantity}`}/>
                            </Grid>       
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <DashboardComponent title="Silver"
                                                    description={`${metrics.userMetricsBySubscription.silverQuantity}`}/>
                            </Grid>  
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <DashboardComponent title="Bronze"
                                                    description={`${metrics.userMetricsBySubscription.bronzeQuantity}`}/>
                            </Grid>  
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <DashboardComponent title="Free"
                                                    description={`${metrics.userMetricsBySubscription.freeQuantity}`}/>
                            </Grid>     
                        </Grid>
                    </Typography>
            }
            {
                !isLoading && metricsCourse &&
                    <Typography component="div">
                        <Grid container spacing={3} >
                            <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                                <CardHeader title="Cursos" />
                            </Grid>         
                        </Grid>                        
                        
                        <Grid container spacing={3} >
                            <Grid item xs={12} sm={6} md={3} lg={3} sx={{ marginBottom: "10px" }}>
                                <DashboardComponent title="Totales"
                                                    description={`${metricsCourse.courseQuantity}`}/>
                            </Grid>         
                        </Grid>   
                          
                        <Grid container spacing={3} >
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <DashboardComponent title="Gold"
                                                    description={`${metricsCourse.courseMetricsBySubscription.goldQuantity}`}/>
                            </Grid>       
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <DashboardComponent title="Silver"
                                                    description={`${metricsCourse.courseMetricsBySubscription.silverQuantity}`}/>
                            </Grid>  
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <DashboardComponent title="Bronze"
                                                    description={`${metricsCourse.courseMetricsBySubscription.bronzeQuantity}`}/>
                            </Grid>  
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <DashboardComponent title="Free"
                                                    description={`${metricsCourse.courseMetricsBySubscription.freeQuantity}`}/>
                            </Grid>     
                        </Grid>
                    </Typography>
            }
        </Typography>
    );
}
