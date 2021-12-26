import { useState} from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { Course } from "types/course/courseType";

interface CourseDetailDialogProps {
    course: Course,
    onCloseDialog: () => void,
}

export function CourseDetailDialog (props: CourseDetailDialogProps) {

    const [open, setOpen] = useState<boolean>(true);
    const titleDialog : string = props.course.title;


    const onHandleClose = () => {
        setOpen(false);
        props.onCloseDialog();
    };
    
    return (
        <Typography component="div">
            <Dialog open={open}
                    onClose={onHandleClose}
                    fullWidth
                    maxWidth="md">
                <DialogTitle>{titleDialog}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} style={{marginTop: 8}}>
                        <Grid container spacing={3} item>
                            <Grid item xs={6} sm={6} md={4} lg={4} >
                                <TextField
                                    size="small"
                                    label="Título"
                                    value={props.course.title}
                                    fullWidth
                                    disabled />
                            </Grid>
                            <Grid item xs={6} sm={6} md={8} lg={8} >
                                <TextField
                                    size="small"
                                    label="Descripción"
                                    value={props.course.description}
                                    fullWidth
                                    disabled />
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3} >
                                <TextField
                                    size="small"
                                    label="Categoría"
                                    value={props.course.category}
                                    fullWidth
                                    disabled />
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3} >
                                <TextField
                                    size="small"
                                    label="Subscripción"
                                    value={props.course.subscription}
                                    fullWidth
                                    disabled />
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3} >
                                <TextField
                                    size="small"
                                    label="Tipo"
                                    value={props.course.type}
                                    fullWidth
                                    disabled />
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3} >
                                <TextField
                                    size="small"
                                    label="Ubicación"
                                    value={props.course.location}
                                    fullWidth
                                    disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                <TextField
                                    size="small"
                                    label="Condiciones de inscripción"
                                    value={props.course.enrollment_conditions}
                                    fullWidth
                                    maxRows={3}
                                    disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                <TextField
                                    size="small"
                                    label="Condiciones de desinscripción"
                                    value={props.course.unenrollment_conditions}
                                    fullWidth
                                    maxRows={3}
                                    disabled />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                <TextField
                                    size="small"
                                    label="Hashtags"
                                    value={props.course.hashtags}
                                    fullWidth
                                    disabled />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={onHandleClose}
                            startIcon={<CloseRoundedIcon />}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </Typography>
    );
}