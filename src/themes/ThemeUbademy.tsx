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

    components: {
        
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: 'black',
                    backgroundColor: 'white',
                },
            },
        },

        MuiCardHeader: {
            styleOverrides: {
                root:{
                  padding: "12px 14px 12px 14px",
                  borderBottom: "2px solid #82C1E7",
                },
                title:{
                  fontWeight: 600,
                  fontSize: "1.142857rem",
                },
            }
        },

        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "#82C1E7"
                }
            }
        }
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
