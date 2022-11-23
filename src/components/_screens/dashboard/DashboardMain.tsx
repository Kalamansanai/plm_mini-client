import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material";

export default function DashboardMain() {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <Grid
                container
                alignContent="flex-start"
                spacing={2}
                item
                order={2}
                xs={12}
                sm={12}
                md={6}
            >
                <Grid item xs={12} sm={12}>
                    <Paper>camera</Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper>controls</Paper>
                </Grid>
            </Grid>
            <Grid order={isSm ? 1 : 3} item xs={6} sm={6} md={3}>
                <Paper>events</Paper>
            </Grid>
        </>
    );
}
