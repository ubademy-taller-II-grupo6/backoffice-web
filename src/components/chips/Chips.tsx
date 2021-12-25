import { Chip } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export function ChipActive () {
    return <Chip label="Activo" size="small" color="primary" icon={<CheckRoundedIcon />} /> 
}

export function ChipBlocked () {
    return <Chip label="Bloqueado" size="small" color="secondary" icon={<CloseRoundedIcon />} />
}

export function ChipGold () {
    const style = {
        color: '#AF9500',
        backgroundColor: '#FCEB00',
    };

    return <Chip label="GOLD" size="small" color="secondary" style={style} />
}

export function ChipBronze () {
    const style = {
        color: '#6A3805',
        backgroundColor: '#AD8A56'
    };

    return <Chip label="BRONZE" size="small" color="secondary" style={style} />
}