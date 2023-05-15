import { config as apiConfig } from "api";
import { backend } from "api";
import { JobsApi, LocationsApi, TasksApi, TasksCreateRes, TaskType } from "api_client";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useFetcher, useLoaderData } from "react-router-dom";
import { CompanyHierarchyNode, Job, Location } from "types";

import CancelIcon from "@mui/icons-material/Cancel";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Divider, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const locationIdStr = url.searchParams.get("location_id");

    if (locationIdStr === null) {
        // TODO(rg): error
        return;
    }

    const locationId = Number(locationIdStr);
    // TODO(rg): error if NaN

    let snapshot = null;
    try {
        snapshot = await new LocationsApi(apiConfig).apiEndpointsLocationsGetSnapshot({
            id: locationId,
        });
    } catch {
        // Location doesn't exist, or doesn't have a snapshot
        // noop
    }

    try {
        const jobs = (await new JobsApi(apiConfig).apiEndpointsJobsList()) as Array<Job>;
        const location = (await new LocationsApi(apiConfig).apiEndpointsLocationsGetById({
            id: locationId,
        })) as Location;

        return { jobs, location, snapshot };
    } catch (err) {
        throw err;
    }
}

// async function getNewSnapshot(
//     detectorId: number,
//     locationId: number,
//     setSnapshot: React.Dispatch<React.SetStateAction<Blob | null>>
// ) {
//     await fetch(`${backend}/api/v1/detectors/${detectorId}/snapshot`);

//     let snapshot = null;
//     try {
//         snapshot = await new LocationsApi(apiConfig).apiEndpointsLocationsGetSnapshot({
//             id: locationId,
//         });
//     } catch {
//         // Location doesn't exist, or doesn't have a snapshot
//         // noop
//     }

//     setSnapshot(snapshot);
// }

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    const parentJobId = formData.get("parentJobId");
    const name = formData.get("name")?.toString();
    const locationId = formData.get("locationId");
    const taskType = formData.get("taskType")?.toString() as TaskType;

    if (parentJobId === null || name === undefined || locationId === null || taskType === undefined)
        return;

    try {
        const result = (await new TasksApi(apiConfig).apiEndpointsTasksCreate({
            tasksCreateReq: {
                parentJobId: Number(parentJobId),
                name,
                locationId: Number(locationId),
                taskType,
            },
        })) as TasksCreateRes;

        if (result && result.id) {
            return redirect("/task/" + result.id);
        }
    } catch (_err) {
        // noop
    }

    return;
}

type LoaderData = {
    jobs: Array<Job>;
    location: Location;
    snapshot: Blob | null;
};

export async function newJobAction({ request }: { request: Request }) {
    const formData = await request.formData();

    const jobName = formData.get("job_name")?.toString();

    if (jobName === undefined) return;

    try {
        await new JobsApi(apiConfig).apiEndpointsJobsCreate({ jobsCreateReq: { name: jobName } });
    } catch (_err) {
        // noop
    }
}

export default function NewTask() {
    const { jobs, location, snapshot } = useLoaderData() as LoaderData;
    const [currentSnapshot, setSnapshot] = useState(snapshot);
    const fetcher = useFetcher();

    const [task, setTask] = useState(null);

    const thing = useActionData();
    console.log(thing);

    const [snapshotUrl, setSnapshotUrl] = useState("https://via.placeholder.com/640x360");
    // let snapshotUrl = ;
    // const source = `${backend}/api/v1/detectors/${3}/stream`;

    useEffect(() => {
        if (currentSnapshot != null) {
            setSnapshotUrl(URL.createObjectURL(currentSnapshot));
        }
    }, [currentSnapshot]);

    const jobsSelectArray = [
        <MenuItem key={""} value={""}>
            <i>None</i>
        </MenuItem>,
        ...jobs.map((j: Job) => (
            <MenuItem key={j.id} value={j.id}>
                {j.name}
            </MenuItem>
        )),
    ];

    // const handleNewSnapshot = () => {
    //     getNewSnapshot(location.detector!.id, location.id, setSnapshot);
    // };

    // NOTE(rg): Some margin is needed to keep the Paper from touching the edge of the screen or the app bar. 2 * margin size is subtracted from the height to avoid scrolling
    return (
        <Container
            maxWidth="xl"
            sx={{ height: "calc(100% - 32px)", my: 2, display: "flex", justifyContent: "center" }}
        >
            <Paper elevation={8} sx={{ width: "60%" }}>
                {/* <Grid container height="100%"> */}
                {/* <Grid item xs={12} lg={8} sx={{ p: 2 }} display="flex" flexDirection="column">
                        <Title sx={{ mb: 4 }}>Snapshot</Title>
                        <Box>
                            <Box
                                component="img"
                                src={snapshotUrl}
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    bgcolor: "black",
                                    boxShadow: 3,
                                }}
                            />
                        </Box>
                        <Box display="flex" gap={2} alignSelf="center" mt={2}>
                            <Button
                                disabled={task === null}
                                onClick={handleNewSnapshot}
                                size="large"
                                variant="outlined"
                                startIcon={<PhotoCameraIcon />}
                            >
                                Take new snapshot
                            </Button>
                            {/* <Button
                                disabled
                                size="large"
                                variant="contained"
                                color="error"
                                startIcon={<CancelIcon />}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled
                                size="large"
                                variant="contained"
                                color="success"
                                startIcon={<SaveIcon />}
                            >
                                Save
                            </Button> */}
                {/* </Box>
                    </Grid> */}
                <Grid
                    item
                    sx={{
                        display: "flex",
                        width: "100%",
                    }}
                >
                    {/* <Divider orientation="vertical" flexItem /> */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        flexGrow={1}
                        height="100%"
                    >
                        <Box display="flex" flexDirection="column" p={2}>
                            <Title sx={{ mb: 4 }}>New task</Title>
                            <Form method="post">
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <TextField required label="Task name" name="name" fullWidth />
                                    <TextField
                                        required
                                        disabled
                                        label="Location"
                                        defaultValue={location.name}
                                        fullWidth
                                    />
                                    <input
                                        readOnly
                                        hidden
                                        type="number"
                                        name="locationId"
                                        value={location.id}
                                    />
                                    <TextField
                                        required
                                        select
                                        label="Task type"
                                        name="taskType"
                                        fullWidth
                                        defaultValue={""}
                                    >
                                        <MenuItem value={""}>
                                            <i>None</i>
                                        </MenuItem>
                                        <MenuItem value={TaskType.ToolKit}>Tool kit</MenuItem>
                                        <MenuItem value={TaskType.ItemKit}>Item kit</MenuItem>
                                    </TextField>
                                    <TextField
                                        required
                                        select
                                        label="Job"
                                        name="parentJobId"
                                        fullWidth
                                        defaultValue={""}
                                    >
                                        {jobsSelectArray}
                                    </TextField>
                                    <Box display="flex" justifyContent="flex-end">
                                        <Button size="large" variant="contained" type="submit">
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>
                            </Form>
                        </Box>
                        <Divider flexItem sx={{ my: 2 }} />
                        <Box display="flex" flexDirection="column" justifyContent="flex-end" p={2}>
                            <Title sx={{ mb: 4 }}>New job</Title>
                            <fetcher.Form method="post" action="new_job">
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <TextField
                                        required
                                        label="Job name"
                                        name="job_name"
                                        fullWidth
                                    />
                                    <Box display="flex" justifyContent="flex-end">
                                        <Button size="large" variant="contained" type="submit">
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>
                            </fetcher.Form>
                        </Box>
                    </Box>
                </Grid>
                {/* </Grid> */}
            </Paper>
        </Container>
    );
}
