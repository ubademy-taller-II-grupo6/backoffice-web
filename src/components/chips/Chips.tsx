import { Chip } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export function ChipActive () {
    return <Chip label="Activo" size="small" color="primary" icon={<CheckRoundedIcon />} /> 
}

export function ChipBlocked () {
    return <Chip label="Bloqueado" size="small" color="secondary" icon={<CloseRoundedIcon />} />
}