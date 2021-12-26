 import { useState} from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from '@mui/material';

import { LoaderBackdrop } from 'components/loader/LoaderBackdrop';

import { Course } from 'types/course/courseType';

import { HttpCourse } from 'http/course/httpCourse';
/*
interface CourseChangeStateDialogProps {
    course: Course,
    onCloseDialog: () => void,
    onConfirmDialog: () => void
}

export function CourseChangeStateDialog (props: CourseChangeStateDialogProps) {
    const [open, setOpen] = useState<boolean>(true);
    const [isSaving, setSaving] = useState<boolean>(false);
    
    const titleFinal : string = "Atención!";
    const textContentFinal : string = `Realmente quiere ${props.course.blocked ? "activar" : "bloquear"} el usuario con mail ${props.course.email}?`;

    const onHandleClose = () => {
        setOpen(false);
        props.onCloseDialog();
    };
    
    const onHandleConfirm = async () => {
        setSaving(true);

        if (props.course.blocked) {
            await HttpCourse.activateCourse(props.course.id)
                    .then(() => {
                        setOpen(false);
                        setSaving(false);
                        props.onConfirmDialog();
                    })
        } else {
            await HttpCourse.blockCourse(props.course.id)
                    .then(() => {
                        setOpen(false);
                        setSaving(false);
                        props.onConfirmDialog();
                    })
        }
    };

    return (
        <Typography component="div">
            <Dialog open={open} 
                    onClose={onHandleClose} 
                    aria-labelledby="form-dialog-title" 
                    fullWidth={true}>

                <DialogTitle>{titleFinal}</DialogTitle>

                <DialogContent sx={{ marginTop: '10px'}}>
                    <DialogContentText>{textContentFinal}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={onHandleClose}>Cancelar</Button>
                    
                    <Button variant="contained"
                            color="primary"
                            size="small"
                            onClick={onHandleConfirm}>Confirmar</Button>
                </DialogActions>
            </Dialog>

            {
                isSaving &&
                    <LoaderBackdrop />
            }
        </Typography>
    );
} */