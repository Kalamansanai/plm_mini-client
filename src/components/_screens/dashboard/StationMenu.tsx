import { Outlet } from "react-router-dom";

import Grid from "@mui/material/Grid";

export default function StationMenu() {
    return (
        <Grid container>
            <div>Sup bro</div>
            <Outlet />
        </Grid>
    );
}
