import { config as apiConfig } from "api";
import { StationsApi } from "api_client";
import { Outlet, Params, useLoaderData } from "react-router-dom";

import { Box } from "@mui/material";
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

    console.log(station);

    return (
        <Box display="flex" sx={{ height: "100%" }}>
            <Paper elevation={8} sx={{ width: "300px", mr: 2 }}>
                <StationMenu station={station} />
            </Paper>
            <Outlet />
        </Box>
    );
}
