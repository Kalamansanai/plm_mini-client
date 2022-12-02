import { config as apiConfig, DetailedError } from "api";
import { ResponseError, StationsApi } from "api_client";
import { Link, Outlet, Params, useLoaderData } from "react-router-dom";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { Station, parseDetectorState } from "../../../types";
import StationMenu from "./StationMenu";

export async function loader({ params }: { params: Params }) {
    const id = params["station_id"]! as any as number;
    let station = null;
    try {
        // NOTE(rg): this cast is kind of a hack; These types mostly look the same, except for the
        // DetectorState
        station = (await new StationsApi(apiConfig).apiEndpointsStationsGetById({ id })) as Station;
    } catch (err) {
        if (err instanceof ResponseError) {
            throw new DetailedError(
                (
                    <>
                        <Typography fontSize="1.2em">Station not found</Typography>
                        <Typography>
                            Select a valid Station <Link to="/hierarchy">here</Link>.
                        </Typography>
                    </>
                ),
                err.message
            );
        }
        throw err;
    }

    station.locations.forEach((l) => {
        if (!l.detector) return;

        l.detector.state = parseDetectorState(l.detector.state as unknown as string);
    });

    return station;
}

export default function DashboardContainer() {
    const station = useLoaderData() as Station;
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Grid
            container
            columnSpacing={2}
            rowSpacing={isSm ? 2 : 0}
            sx={{ height: isSm ? "auto" : "100%" }}
        >
            <Grid item xs={12} sm={12} md={3} lg={2} sx={{ height: isSm ? "480px" : "100%" }}>
                <Paper square elevation={16} sx={{ height: "100%" }}>
                    <StationMenu station={station} />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={10}>
                <Box sx={{ height: "100%", mt: 2, mx: 2, pb: 2 }}>
                    <Outlet />
                </Box>
            </Grid>
        </Grid>
    );
}
