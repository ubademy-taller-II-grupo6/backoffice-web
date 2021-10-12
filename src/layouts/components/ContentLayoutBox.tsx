import { Box, Grid } from '@material-ui/core';

export function ContentLayoutBox () {
    const listColor : string[] = ['#C1E0F2', '#82C1E7', '#C1E0F2', '#82C1E7'];

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