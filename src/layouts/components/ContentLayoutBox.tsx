import { Box, Grid } from '@material-ui/core';

export function ContentLayoutBox () {
    const listColor : string[] = ['#94C0C0', '#FFBA67', '#B3A580', '#76CE86'];

    return (
        <Grid container item xs={12}>
            {
                listColor.map((oneColor, index) => (
                    <Grid item xs={3} key={`layoutBox_${index}`}>
                        <LayoutBox color={oneColor} />
                    </Grid>
                ))
            }
        </Grid>
    );
}

interface LayoutBoxProps {
    color: string
}

function LayoutBox (props: LayoutBoxProps) {
    const heightBox : number = 60;

    return (
        <Box sx={{
                height: heightBox,
                bgcolor: props.color
            }} />
    );
}