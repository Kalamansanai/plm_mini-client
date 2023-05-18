import { backend, config as apiConfig, DetailedError } from "api";
import { LocationsApi, ResponseError } from "api_client";
import axios from "axios";
import { plainToClass } from "class-transformer";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Link, Params, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import { Location, OngoingTask, parseDetectorState, Station } from "types";

import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";

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

async function getNewLocation(
    setLocation: React.Dispatch<React.SetStateAction<Location>>,
    location_id: number
) {
    await fetch(`${backend}/api/v1/locations/${location_id}`)
        .then((res) => res.json())
        .then((result) => {
            if (result.detector) {
                result.detector.state = parseDetectorState(
                    result.detector.state as unknown as string
                );
            }
            setLocation(result);
        });
}

export default function Dashboard() {
    const [selectedTaskId, setSelectedTaskId] = useState(-1);

    const temp = useLoaderData() as Location;
    const [location, setLocation] = useState(temp);

    useEffect(() => {
        setLocation(temp);
    }, [temp]);

    const station = useRouteLoaderData("dashboard-container") as Station;

    const subscribe = async (): Promise<EventSource> => {
        const eventSource = new EventSource(
            `${backend}/api/v1/locations/${location.id}/sse-notify`
        );
        eventSource.onmessage = (e) => {
            if (e.data == location.id) {
                getNewLocation(setLocation, location.id);
            }
        };
        return eventSource;
    };

    useEffect(() => {
        const eventSource = subscribe();
        return () => {
            eventSource.then((res) => res.close());
        };
    }, [location.id]);

    const [streamFps, setStreamFps] = useState(0);

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
    const instance = task?.ongoingInstance;

    const detState = useRef(false);
    const isSuccessful = useRef(true);
    const detectionSuccessful = useRef(false);

    if (instance) {
        detState.current = true;
    }

    if (detState.current) {
        detectionSuccessful.current = instance?.currentOrderNumRemainingSteps === undefined;
    }

    if (!instance) {
        detState.current = false;
    }

    return (
        <Grid container spacing={2} height="100%" overflow={"hidden"}>
            <Grid display="flex" flexDirection="column" gap={2} item xs={12} xl={9}>
                {detectionSuccessful.current ? (
                    <EndDetectionAlert location_id={location.id} />
                ) : null}
                <Stream
                    playing={playing}
                    detector={location.detector}
                    setStreamFps={setStreamFps}
                    ongoingTask={location.ongoingTask}
                />
                <Grid container spacing={2} flexGrow={1}>
                    <Grid item xs={12} sm={12} md={12} lg={3}>
                        <StreamControls
                            playing={playing}
                            setPlaying={setPlaying}
                            detector={location.detector}
                            streamFps={streamFps}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={9}>
                        <DetectionControls
                            detector={location.detector}
                            task={task}
                            setSelected={setSelectedTaskId}
                            selected={selectedTaskId}
                            detectorId={location?.detector?.id}
                            parseDetectorState={parseDetectorState}
                        />
                    </Grid>
                </Grid>
                {isBelowXl ? (
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <NextStepGuide instance={instance} />
                        </Grid>
                        <Grid item xs={8}>
                            <TaskInstance
                                instance={instance}
                                maxOrderNum={task?.maxOrderNum}
                                location_id={location.id}
                            />
                        </Grid>
                    </Grid>
                ) : null}
            </Grid>
            {!isBelowXl ? (
                <Grid display="flex" item xl={3} height="100%" flexDirection="column" gap={2}>
                    <NextStepGuide instance={instance} />
                    <Box flexGrow={1}>
                        <TaskInstance
                            instance={instance}
                            maxOrderNum={task?.maxOrderNum}
                            location_id={location.id}
                        />
                    </Box>
                </Grid>
            ) : null}
        </Grid>
    );
}

type Props = {
    location_id: number;
};

function EndDetectionAlert({ location_id }: Props) {
    const navigate = useNavigate();
    return (
        <Grid
            display="flex"
            flexDirection="row"
            justifyContent="center"
            sx={{ width: "100%", borderRadius: 3, minHeight: 50, backgroundColor: "white" }}
            alignItems="center"
        >
            <Typography sx={{ ml: 2, mr: 1 }}>
                Detection Task finished ! The timstamps of the events are available on the instances
                panel !
            </Typography>
            <Button
                variant="outlined"
                sx={{ ml: 1, mr: 2 }}
                onClick={() => navigate(`../prev_instances/${location_id}`)}
            >
                View
            </Button>
        </Grid>
    );
}
