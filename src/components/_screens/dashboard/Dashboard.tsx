import { config as apiConfig, DetailedError } from "api";
import { LocationsApi, ResponseError } from "api_client";
import { useState } from "react";
import { Params, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { Location, parseDetectorState, Station } from "types";

import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

import DetectionControls from "./DetectionControls";
import NextStepGuide from "./NextStepGuide";
import Stream from "./Stream";
import StreamControls from "./StreamControls";
import TaskInstance from "./TaskInstance";

export async function loader({ params }: { params: Params }) {
    const id = params["location_id"]! as any as number;
    let location = null;

    try {
        location = (await new LocationsApi(apiConfig).apiEndpointsLocationsGetById({
            id,
        })) as Location;

        if (location.detector) {
            location.detector.state = parseDetectorState(
                location.detector.state as unknown as string
            );
        }
    } catch (err) {
        if (err instanceof ResponseError) {
            throw new DetailedError(
                err,
                (
                    <Typography fontSize="1em">
                        Location not found. Please select a Location from the menu on the left.
                    </Typography>
                )
            );
        }
    }

    return location;
}

export default function Dashboard() {
    const station = useRouteLoaderData("dashboard-container") as Station;
    const location = useLoaderData() as Location;

    if (!station.locations.find((l) => l.id === location.id)) {
        throw new DetailedError(
            null,
            (
                <Typography fontSize="1em">
                    The selected Location is not part of the selected Station.
                </Typography>
            )
        );
    }

    const theme = useTheme();
    const [playing, setPlaying] = useState(false);

    const isBelowXl = useMediaQuery(theme.breakpoints.down("xl"));

    const task = location.ongoingTask;
    const steps = task?.steps;
    const instance = task?.ongoingInstance;

    return (
        <Grid container spacing={2} height="100%">
            <Grid display="flex" flexDirection="column" gap={2} item xs={12} xl={9}>
                <Stream />
                <Grid container spacing={2} flexGrow={1}>
                    <Grid item xs={12} sm={12} md={12} lg={3}>
                        <StreamControls
                            playing={playing}
                            setPlaying={setPlaying}
                            detector={location.detector}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={9}>
                        <DetectionControls detector={location.detector} />
                    </Grid>
                </Grid>
                {isBelowXl ? (
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <NextStepGuide instance={instance} />
                        </Grid>
                        <Grid item xs={8}>
                            <TaskInstance instance={instance} maxOrderNum={task?.maxOrderNum} />
                        </Grid>
                    </Grid>
                ) : null}
            </Grid>
            {!isBelowXl ? (
                <Grid display="flex" item xl={3} height="100%" flexDirection="column" gap={2}>
                    <NextStepGuide instance={instance} />
                    <Box flexGrow={1}>
                        <TaskInstance instance={instance} maxOrderNum={task?.maxOrderNum} />
                    </Box>
                </Grid>
            ) : null}
        </Grid>
    );
}
