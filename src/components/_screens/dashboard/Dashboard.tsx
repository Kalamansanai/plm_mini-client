import { config as apiConfig } from "api";
import { StationsApi } from "api_client";
import { Outlet, Params, useLoaderData } from "react-router-dom";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Unstable_Grid2";

import { Station } from "../../../types";
import DashboardMain from "./DashboardMain";
import StationMenu from "./StationMenu";

export async function loader({ params }: { params: Params }) {
    const id = params["station_id"]! as any as number;
    return await new StationsApi(apiConfig).apiEndpointsStationsGetById({ id });
}

export default function Dashboard() {
    const station = useLoaderData() as Station;
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Grid container columnSpacing={2} rowSpacing={isSm ? 2 : 0} sx={{ height: "100%" }}>
            <Grid item order={0} xs={6} sm={6} md={3} sx={{ height: "100%" }}>
                <Paper elevation={8} sx={{ height: "100%" }}>
                    <StationMenu station={station} />
                </Paper>
            </Grid>
            <Outlet />
        </Grid>
    );
}
