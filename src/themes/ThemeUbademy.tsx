import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme ({
    typography: {
        fontFamily: [
        'Poppins',
        'Helvetica',
        '"sans-serif"',
        ].join(','),
    },
});

export interface ThemeUbademyProps{
    children?: ReactNode;
}

export function ThemeUbademy (props: ThemeUbademyProps) {
  return (
    <ThemeProvider theme={theme}>
        {props.children}
    </ThemeProvider>
  );
}
