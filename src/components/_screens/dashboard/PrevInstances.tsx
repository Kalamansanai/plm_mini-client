import { backend, config as apiConfig, DetailedError } from "api";
import { LocationsApi, ResponseError } from "api_client";
import { type } from "os";
import { useEffect, useState } from "react";
import { Params, useLoaderData } from "react-router-dom";
import { parseDetectorState, Location, Task, TaskInstance, Event } from "types";

import {
    Box,
    Container,
    CssBaseline,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    Typography,
} from "@mui/material";
import { width } from "@mui/system";

import EventCard from "./EventCard";

export async function loader({ params }: { params: Params }) {
    const id = params["location_id"]! as any as number;
    let location = null;
    let instances = null;

    try {
        location = (await new LocationsApi(apiConfig).apiEndpointsLocationsGetById({
            id,
        })) as Location;

        if (location.detector) {
            location.detector.state = parseDetectorState(
                location.detector.state as unknown as string
            );
        }

        // tasks = await new LocationsApi(apiConfig).apiEndpointsLocationsGetTasks({
        //     id,
        // });

        const response = await fetch(`${backend}/api/v1/locations/${id}/prev-instances`, {
            // headers: { "Content-Type": "application/json" },
            // credentials: "include",
        });

        if (response.status != 400) {
            const temp = await response.json();
            instances = temp;
        } else {
            console.log("instance error");
        }
    } catch (err) {
        if (err instanceof ResponseError) {
            throw new DetailedError(
                err,
                <Typography fontSize="1em">Location not found.</Typography>
            );
        }
    }
    return { location: location, taskInstances: instances };
}

async function getInstanceEvents(
    instance_id: number | null,
    setEvents: React.Dispatch<React.SetStateAction<Event[] | null>>
) {
    if (instance_id === -1) {
        return;
    }
    const response = await fetch(`${backend}/api/v1/${instance_id}/events`, {
        // headers: { "Content-Type": "application/json" },
        // credentials: "include",
    });

    if (response.status != 400) {
        const temp = await response.json();
        setEvents(temp.events);
    } else {
        console.log("instance error");
    }
}

export default function PrevInstances() {
    const temp = useLoaderData() as {
        location: Location;
        taskInstances: { instances: TaskInstance[] };
    };
    const location = temp.location as Location;
    const instances = temp.taskInstances.instances;

    const [selected, setSelected] = useState(-1);
    const [events, setEvents] = useState<Event[] | null>(null);

    useEffect(() => {
        getInstanceEvents(selected, setEvents);
    }, [selected]);

    console.log(events);

    return (
        <Box
            sx={{
                marginTop: 2,
                marginBottom: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 3,
                height: "100vh",
                width: "100%",
            }}
        >
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                {location.name}
            </Typography>
            <Grid
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                sx={{ width: "100%", height: "80%" }}
            >
                <Grid
                    display="flex"
                    flexDirection="column"
                    sx={{
                        width: "45%",
                        height: "100%",
                        boxShadow: 3,
                        borderRadius: 5,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h6">Tasks</Typography>
                    </Box>
                    <InstanceList
                        taskInstances={instances}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Grid>
                <Grid
                    display="flex"
                    flexDirection="column"
                    sx={{
                        width: "45%",
                        height: "100%",
                        boxShadow: 3,
                        borderRadius: 5,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h6">Instances</Typography>
                    </Box>
                    <EventList events={events} />
                </Grid>
            </Grid>
        </Box>
    );
}

type TCProps = {
    taskInstances: TaskInstance[];
    selected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
};

function InstanceList({ taskInstances, selected, setSelected }: TCProps) {
    return (
        <Grid display="flex" flexDirection="column" sx={{ height: "100%" }}>
            <Grid display="flex" flexDirection="row" sx={{ width: "100%" }}>
                <Typography
                    sx={{
                        width: "25%",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "lightgrey",
                        borderRadius: 3,
                        ml: 1,
                        mr: 1,
                    }}
                >
                    Id
                </Typography>
                <Typography
                    sx={{
                        width: "25%",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "lightgrey",
                        borderRadius: 3,
                        ml: 1,
                        mr: 1,
                    }}
                >
                    Final State
                </Typography>
                <Typography
                    sx={{
                        width: "25%",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "lightgrey",
                        borderRadius: 3,
                        ml: 1,
                        mr: 1,
                    }}
                >
                    Task Id
                </Typography>
                <Typography
                    sx={{
                        width: "25%",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "lightgrey",
                        borderRadius: 3,
                        ml: 1,
                        mr: 1,
                    }}
                >
                    Events
                </Typography>
            </Grid>
            <List
                sx={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    overflowX: "auto",
                    height: "80%",
                    width: "100%",
                    mt: 2,
                }}
            >
                {taskInstances.map((instance: TaskInstance) => (
                    <ListItem disablePadding key={instance.id} sx={{ width: "100%" }}>
                        <ListItemButton
                            onClick={() => setSelected(instance.id)}
                            sx={{
                                borderRadius: 4,
                                backgroundColor: selected === instance.id ? "lightblue" : "white",
                            }}
                        >
                            <Grid
                                display="flex"
                                flexDirection="row"
                                sx={{ height: "100%", width: "100%" }}
                            >
                                <Typography
                                    sx={{
                                        width: "25%",
                                        display: "flex",
                                        justifyContent: "center",
                                        borderRadius: 3,
                                        ml: 1,
                                        mr: 1,
                                    }}
                                >
                                    {instance.id}
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <Typography
                                    sx={{
                                        width: "25%",
                                        display: "flex",
                                        justifyContent: "center",
                                        borderRadius: 3,
                                        ml: 1,
                                        mr: 1,
                                    }}
                                >
                                    {instance.finalState}
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <Typography
                                    sx={{
                                        width: "25%",
                                        display: "flex",
                                        justifyContent: "center",
                                        borderRadius: 3,
                                        ml: 1,
                                        mr: 1,
                                    }}
                                >
                                    {instance.taskId}
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <Typography
                                    sx={{
                                        width: "25%",
                                        display: "flex",
                                        justifyContent: "center",
                                        borderRadius: 3,
                                        ml: 1,
                                        mr: 1,
                                    }}
                                >
                                    {instance.events.length}
                                </Typography>
                            </Grid>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
}

type ICProps = {
    events: Event[] | null;
};

function EventList({ events }: ICProps) {
    return (
        <Grid display="flex" flexDirection="column-reverse" sx={{ overflowX: "auto" }}>
            {events ? events?.map((event) => <EventCard event={event} />) : <Box></Box>}
        </Grid>
    );
}
