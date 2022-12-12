import { config as apiConfig } from "api";
import { JobsApi, LocationsApi, TaskType } from "api_client";
import Title from "components/Title";
import { useRef } from "react";
import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { CompanyHierarchyNode, Job, Location, Snapshot } from "types";

import CancelIcon from "@mui/icons-material/Cancel";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Divider, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
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

    try {
        const jobs = (await new JobsApi(apiConfig).apiEndpointsJobsList()) as Array<Job>;
        const location = (await new LocationsApi(apiConfig).apiEndpointsLocationsGetById({
            id: locationId,
        })) as CompanyHierarchyNode;
        // todo: snapshot
        const snapshotRaw = await new LocationsApi(apiConfig).apiEndpointsLocationsGetSnapshot({
            id: locationId,
        });
        const blob = new Blob([snapshotRaw], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        console.log(url);

        const snapshot = null;

        return { jobs, location, snapshot };
    } catch (err) {
        throw err;
    }
}

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    console.log(formData);
}

type LoaderData = {
    jobs: Array<Job>;
    location: CompanyHierarchyNode;
    snapshot: Snapshot | null;
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

// NOTE(rg): Some margin is needed to keep the Paper from touching the edge of the screen or the app bar. 2 * margin size is subtracted from the height to avoid scrolling
export default function NewTask() {
    const { jobs, location, snapshot } = useLoaderData() as LoaderData;
    const fetcher = useFetcher();
    const imgSource = "https://via.placeholder.com/640x360";

    // console.log(jobs);
    // console.log(location);
    // console.log(snapshot);

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

    return (
        <Container maxWidth="xl" sx={{ height: "calc(100% - 32px)", my: 2 }}>
            <Paper elevation={8} sx={{ height: "auto" }}>
                <Grid container height="100%">
                    <Grid item xs={12} lg={8} sx={{ p: 2 }} display="flex" flexDirection="column">
                        <Title sx={{ mb: 4 }}>Snapshot</Title>
                        <Box>
                            <Box
                                component="img"
                                src={imgSource}
                                sx={{ height: "100%", width: "100%", bgcolor: "black" }}
                            />
                        </Box>
                        <Box display="flex" gap={2} alignSelf="center" mt={2}>
                            <Button size="large" variant="outlined" startIcon={<PhotoCameraIcon />}>
                                Take new snapshot
                            </Button>
                            <Button
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
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                        <Divider orientation="vertical" flexItem />
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
                                        <TextField
                                            required
                                            label="Task name"
                                            name="name"
                                            fullWidth
                                        />
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
                                            name="location_id"
                                            value={location.id}
                                        />
                                        <TextField
                                            required
                                            select
                                            label="Task type"
                                            name="type"
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
                                            name="job_id"
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
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-end"
                                p={2}
                            >
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
                </Grid>
            </Paper>
        </Container>
    );
}
