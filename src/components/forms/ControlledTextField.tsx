import React from 'react';
import { Control, Controller } from "react-hook-form";
import { StandardTextFieldProps, TextField } from "@material-ui/core";

export interface ControlledTextFieldProps extends StandardTextFieldProps {
    control?: Control<any>
}

export const ControlledTextField = (props: ControlledTextFieldProps) => (
    <Controller
        control={props.control}
        name={props.name || ''}
        render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
                {...props}
                variant="outlined"
                size="small"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{shrink: !!(value + 1)}}
            />
        )}
    />
);
