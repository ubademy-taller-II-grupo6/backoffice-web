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
                  padding: "7px 12px 1px 6px",
                  borderBottom: "1.5px solid #82C1E7",
                },
                title:{
                  fontWeight: 600,
                  fontSize: "1.142857rem",
                  color: "#4a4a61"
                },
            }
        },

        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "#82C1E7"
                }
            }
        },

        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: 'rgba(0, 0, 0, 0.87)',
                    borderBottom: '1px solid #82C1E7',
                    fontSize: '11px',
                    fontWeight: 600,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    textOverflow: 'ellipsis',
                    textTransform: 'uppercase'
                },
                body: {
                    fontSize: "12px",
                    padding: "10px 15px 10px 15px",
                    textOverflow: 'ellipsis'      
                },
            }
        },

        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& tr:hover': {
                        cursor: "context-menu",
                        boxShadow: "0px 2px 5px rgba(69,101,173,0.1)",
                        WebkitBoxShadow: "0px 2px 5px rgba(69,101,173,0.1)",
                        transform: "translateY(-1px) scale(1.01)",
                        WebkitTransform: "translateY(-1px) scale(1.01)"
                      },
                      '& tr:nth-of-type(odd)': {
                        backgroundColor: "#f2f8f9"
                      }  
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
