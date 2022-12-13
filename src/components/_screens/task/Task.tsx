import { config as apiConfig, DetailedError } from "api";
import { JobsApi, LocationsApi, ResponseError, TasksApi } from "api_client";
import Title from "components/Title";
import { useState } from "react";
import { Params, useLoaderData } from "react-router-dom";
import {
    CompanyHierarchyNode,
    Job,
    Object,
    Step,
    TaskType,
    TaskEditorSelectionType as SelectionType,
    GetStepActionString,
} from "types";

import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    MenuItem,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import TaskComponentFields from "./TaskComponentFields";

type EditedTask = {
    id: number;
    name: string;
    taskType: TaskType;
    location: CompanyHierarchyNode;
    job: Job;
    steps: Array<Step>;
    objects: Array<Object>;
};

const resolveStepObjects = (
    steps: Array<Step & { objectId: number }>,
    objects: Array<Object>
): Array<Step> => {
    const resolvedSteps = steps.map((s) => {
        s.object = objects.find((o) => o.id === s.objectId)!;
        return s;
    });

    return resolvedSteps;
};

// get task and children steps, objects
export async function loader({ params }: { params: Params }) {
    const id = params["task_id"]! as any as number;

    try {
        const jobs = (await new JobsApi(apiConfig).apiEndpointsJobsList()) as Array<Job>;
        const task = await new TasksApi(apiConfig).apiEndpointsTasksGetById({ id });
        const stepsObjects = await new TasksApi(apiConfig).apiEndpointsTasksGetObjectsAndSteps({
            taskId: id,
        });
        const snapshot = await new LocationsApi(apiConfig).apiEndpointsLocationsGetSnapshot({
            id: task!.location!.id!,
        });

        const steps = stepsObjects.steps! as Array<Step & { objectId: number }>;
        const objects = stepsObjects.objects! as Array<Object>;
        const resolvedSteps = resolveStepObjects(steps, objects);

        const editedTask: EditedTask = {
            id: task.id!,
            name: task.name!,
            taskType: task.taskType!,
            location: task.location! as CompanyHierarchyNode,
            job: task.job! as Job,
            steps: resolvedSteps,
            objects: objects,
        };

        return { jobs, task: editedTask, snapshot };
    } catch (err) {
        if (err instanceof ResponseError) {
            throw new DetailedError(
                err,
                <Typography fontSize="1em">Task or snapshot not found.</Typography>
            );
        }

        throw err;
    }
}

type LoaderData = {
    jobs: Array<Job>;
    task: EditedTask;
    snapshot: Blob;
};

// task update
export async function action({ request }: { request: Request }) {}

export default function Task() {
    const theme = useTheme();
    const { jobs, task, snapshot } = useLoaderData() as LoaderData;
    const [selection, setSelection] = useState<{ name: string; type: SelectionType } | null>(null);

    const snapshotUrl = URL.createObjectURL(snapshot);

    console.log(task.steps);

    const isBelowLg = useMediaQuery(theme.breakpoints.down("lg"));

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

    type Group = { [orderNum: number]: Array<Step> };
    const stepsGroupedByOrder = task.steps.reduce<Group>((groups: Group, step: Step) => {
        groups[step.orderNum] = groups[step.orderNum] || [];
        groups[step.orderNum]!.push(step);
        return groups;
    }, {});

    const select = (name: string, type: SelectionType) => {
        if (selection && selection.name === name && selection.type === type) {
            setSelection(null);
        } else {
            setSelection({ name, type });
        }
    };

    return (
        <Container maxWidth="xl" sx={{ height: !isBelowLg ? "calc(100% - 32px)" : "auto", my: 2 }}>
            <Paper elevation={8} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Grid container sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} lg={4} display="flex" flexDirection="column">
                        <Box display="flex" flexDirection="column" p={2}>
                            <Title sx={{ mb: 2 }}>General</Title>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        required
                                        label="Name"
                                        name="name"
                                        fullWidth
                                        defaultValue={task.name}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        required
                                        select
                                        label="Task type"
                                        name="taskType"
                                        fullWidth
                                        defaultValue={task.taskType}
                                    >
                                        <MenuItem value={""}>
                                            <i>None</i>
                                        </MenuItem>
                                        <MenuItem value={TaskType.ToolKit}>Tool kit</MenuItem>
                                        <MenuItem value={TaskType.ItemKit}>Item kit</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        required
                                        disabled
                                        label="Location"
                                        defaultValue={task.location.name}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        required
                                        select
                                        label="Job"
                                        name="parentJobId"
                                        fullWidth
                                        defaultValue={task.job.id}
                                    >
                                        {jobsSelectArray}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider flexItem />
                        <Box display="flex" flexDirection="column" flexGrow={1}>
                            <Grid container height="100%">
                                <Grid item xs={5} display="flex" flexDirection="column" p={2}>
                                    <Title sx={{ mb: 2 }}>Objects</Title>
                                    <List disablePadding>
                                        {task.objects.map((o, i) => (
                                            <ListItem key={i} disablePadding>
                                                <ListItemButton
                                                    sx={{ fontSize: "1.2em" }}
                                                    selected={
                                                        !!selection &&
                                                        o.name === selection.name &&
                                                        selection.type === "object"
                                                    }
                                                    onClick={() => select(o.name, "object")}
                                                >
                                                    {o.name}
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid item xs={7} display="flex">
                                    {!isBelowLg ? (
                                        <Divider orientation="vertical" flexItem />
                                    ) : null}
                                    <Box display="flex" flexDirection="column" flexGrow={1} p={2}>
                                        <Title sx={{ mb: 2 }}>Steps</Title>
                                        <List disablePadding>
                                            {task.steps.map((s, i) => {
                                                const actionString = GetStepActionString(s);
                                                const color =
                                                    actionString === "remove"
                                                        ? "error.main"
                                                        : actionString === "replace"
                                                        ? "info.main"
                                                        : "text.default";

                                                return (
                                                    <ListItem key={i} disablePadding>
                                                        <ListItemButton
                                                            selected={
                                                                !!selection &&
                                                                s.object.name === selection.name &&
                                                                selection.type === "step"
                                                            }
                                                            onClick={() =>
                                                                select(s.object.name, "step")
                                                            }
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "1.2em",
                                                                    color: color,
                                                                }}
                                                            >
                                                                {actionString}{" "}
                                                                <Box
                                                                    component="span"
                                                                    sx={{ color: "primary.main" }}
                                                                >
                                                                    {s.object.name}
                                                                </Box>
                                                            </Typography>
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={8} display="flex">
                        {!isBelowLg ? <Divider orientation="vertical" flexItem /> : null}
                        <Box display="flex" flexDirection="column" flexGrow={1} sx={{ p: 2 }}>
                            <Title sx={{ mb: 2 }}>Location snapshot</Title>
                            <Box flexShrink={0}>
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
                            <Box display="flex" flexDirection="column" flexGrow={1}>
                                <TaskComponentFields
                                    selection={selection}
                                    steps={task.steps}
                                    objects={task.objects}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Divider flexItem />
                <Box display="flex" p={1} justifyContent="space-between">
                    <Box></Box>
                    <Box display="flex" gap={1}>
                        <Button variant="contained" color="info">
                            Revert
                        </Button>
                        <Button variant="contained">Save changes</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
